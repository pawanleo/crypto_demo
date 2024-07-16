import { setSelectedCrypto } from '@/lib/features/counter/cryptoSlice'
import { useAppDispatch } from '@/lib/hooks'
import React, { useState } from 'react'



const ChangeCryptoModal = () => {
  const [newCrypto, setNewCrypto] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useAppDispatch()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newCrypto) {
      dispatch(setSelectedCrypto(newCrypto.toUpperCase()))
      setNewCrypto('')
      setIsOpen(false)
    }
  }

  return (
    <div>
      <button 
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Change Crypto
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Change Crypto</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={newCrypto}
                onChange={(e) => setNewCrypto(e.target.value)}
                placeholder="Enter crypto symbol (e.g., BTC)"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Change
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChangeCryptoModal