const WebSocket = require('ws');
const mongoose = require('mongoose');
const { getRecentCryptoDataService } = require('./services/crytpoServices');

const wss = new WebSocket.Server({ port: 3002 });

wss.on('connection', (ws) => {
  console.log('Client connected');
  
  // Store the selected crypto code for each client
  let selectedCrypto = 'BTC'; // Default value
  
  // Listen for messages from the client
  ws.on('message', async (message) => {
    const { type, data } = JSON.parse(message);
    
    if (type === 'SELECT_CRYPTO') {
      selectedCrypto = data;
      const cryptoData = await getRecentCryptoDataService(selectedCrypto);
      ws.send(JSON.stringify(cryptoData));
    }
  });

  ws.on('close', () => console.log('Client disconnected'));
  
 // Use change stream to watch for changes in the crypto data collection
 const cryptoCollection = mongoose.connection.collection('Crypto');
 const changeStream = cryptoCollection.watch();

 changeStream.on('change', async (change) => {
   if (change.operationType === 'insert' || change.operationType === 'update') {
    console.log("changed data sent")
     const data = await getRecentCryptoDataService(selectedCrypto);
     ws.send(JSON.stringify(data));
   }
 });

 ws.on('close', () => changeStream.close());
});
