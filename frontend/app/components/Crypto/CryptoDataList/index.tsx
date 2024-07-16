
'use client';
import {
  selectCryptoData,
  selectCryptoStatus,
  selectSelectedCrypto,
  setCryptoData,
  setSelectedCrypto,
  toggleModal,
} from "@/lib/features/cryptoSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import useWebSocket from "@/utils/useWebSocket";
import "./cryptoList.css"
import { useEffect } from "react";
import axios from "axios";
import ChangeCryptoModal from "../ChangeCryptoModal";

const CryptoDataList = () => {
  const dispatch = useAppDispatch();
  const cryptoData = useAppSelector(selectCryptoData);
  const selectedCrypto = useAppSelector(selectSelectedCrypto);
  const cryptoStatus = useAppSelector(selectCryptoStatus);

  // Use WebSocket hook
  useWebSocket(selectedCrypto);
  useEffect(() => {
    // Fetch data from API 1
    axios.get(`http://localhost:8080/api/crypto/recent/${selectedCrypto}`)
        .then(response => {
            console.log(response.data)
            dispatch(setCryptoData(response.data));
        })
        .catch(error => {
            console.error('Error fetching data from API 1:', error);
            // Handle error
        });
}, [selectedCrypto]);
  const handleCryptoChange = (crypto: string) => {
    dispatch(setSelectedCrypto(crypto));
  };
const handleModalToggle=()=>{
    dispatch(toggleModal(true))
}
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Real-Time Crypto Data</h1>
      <ChangeCryptoModal/>

     
      {cryptoStatus === "loading" && <p>Loading...</p>}
      {cryptoStatus === "failed" && <p>Failed to fetch data</p>}
      {cryptoData.length > 0 && (
      <div className="row">
      <div className="col-md-12">
        <table className="table crypto-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Market Cap</th>
              <th scope="col">Price</th>
              <th scope="col">Supply</th>
              <th scope="col">Vol(24h)</th>
              <th scope="col">%(24h)</th>
            </tr>
          </thead>
          <tbody>
          {cryptoData.map((crypto:any, index:any) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{crypto.markets}</td>
                    <td style={{"color":crypto.color}}> {crypto.rate}</td>
                    <td style={{"color":crypto.color}}>{crypto.totalSupply}</td>
                    <td style={{"color":crypto.color}}>{crypto.volume}</td>
                    <td style={{"color":crypto.color}}>{crypto.delta.day}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
      )}
    </div>
  );
};

export default CryptoDataList;
