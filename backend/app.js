const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const cryptoRoutes = require('./routes/cryptoRoutes');
const { fetchCryptoDataService } = require("./services/crytpoServices");
require('./Websocket'); // Import the WebSocket server
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use('/api/crypto', cryptoRoutes);

// Poll data every 5 seconds
setInterval(async () => {
  await fetchCryptoDataService();
}, 120000);

// Initial data fetch
(async () => {
  await fetchCryptoDataService();
})();

module.exports = app;
