
import useWebSocket from "@/hooks/useWebSocket";
import {
  selectCryptoData,
  selectCryptoStatus,
  selectSelectedCrypto,
  setSelectedCrypto,
} from "@/lib/features/counter/cryptoSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const cryptoData = useAppSelector(selectCryptoData);
  const selectedCrypto = useAppSelector(selectSelectedCrypto);
  const cryptoStatus = useAppSelector(selectCryptoStatus);

  // Use WebSocket hook
  useWebSocket(selectedCrypto);

  const handleCryptoChange = (crypto: string) => {
    dispatch(setSelectedCrypto(crypto));
  };

  return (
    <div>
      <h1>Real-Time Crypto Data</h1>
      <select
        value={selectedCrypto}
        onChange={(e) => handleCryptoChange(e.target.value)}
      >
        <option value="BTC">Bitcoin</option>
        <option value="ETH">Ethereum</option>
        {/* Add more options as needed */}
      </select>
      {cryptoStatus === "loading" && <p>Loading...</p>}
      {cryptoStatus === "failed" && <p>Failed to fetch data</p>}
      {cryptoData.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Symbol</th>
              {/* Add more headers as needed */}
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((entry, index) => (
              <tr key={index}>
                <td>{entry.name}</td>
                <td>{entry.symbol}</td>
                {/* Add more data cells as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HomePage;
