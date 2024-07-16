import React from 'react'


import { useAppSelector } from '@/lib/hooks'
import { selectCryptoData, selectSelectedCrypto } from '@/lib/features/counter/cryptoSlice'

const CryptoDataDisplay = () => {
  const cryptoData = useAppSelector(selectCryptoData)
  const currentCrypto = useAppSelector(selectSelectedCrypto)

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{currentCrypto} Real-time Data</h2>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b text-left">Timestamp</th>
            <th className="py-2 px-4 border-b text-left">Price</th>
            {/* Add more headers as needed */}
          </tr>
        </thead>
        <tbody>
          {cryptoData.slice(-20).map((data, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="py-2 px-4 border-b">{new Date(data.timestamp).toLocaleString()}</td>
              <td className="py-2 px-4 border-b">${data.price.toFixed(2)}</td>
              {/* Add more cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CryptoDataDisplay