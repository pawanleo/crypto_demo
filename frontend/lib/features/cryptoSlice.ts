
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from "@/lib/store";
import { PayloadAction } from "@reduxjs/toolkit";

export interface CryptoSliceState {
  data: any[]; // Adjust type according to your data structure
  selectedCrypto: string;
  status: "idle" | "loading" | "failed";
  modalOpen:boolean
}

const initialState: CryptoSliceState = {
  data: [],
  selectedCrypto: "BTC", // Default selected crypto
  status: "idle",
  modalOpen:false
};

export const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: (create) => ({
    setSelectedCrypto: (state, action: PayloadAction<string>) => {
      state.selectedCrypto = action.payload;
    },
    setCryptoData:(state, action: PayloadAction<any[]>) => {
      state.data = action.payload;
      state.status="idle"
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.status = "failed";
    },
    toggleModal: (state, action: PayloadAction<boolean>) => {
      state.modalOpen = action.payload;
    },
  }),
});

// Add extra reducers for handling async actions like WebSocket updates
export const { setSelectedCrypto, setCryptoData, setError ,toggleModal} = cryptoSlice.actions;

// Selectors
export const selectCryptoData = (state: RootState) => state.crypto.data;
export const selectSelectedCrypto = (state: RootState) => state.crypto.selectedCrypto;
export const selectCryptoStatus = (state: RootState) => state.crypto.status;

// Reducer
export default cryptoSlice.reducer;
