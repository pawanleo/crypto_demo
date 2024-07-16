// store/slices/cryptoSlice.ts

import { createAppSlice } from "@/lib/createAppSlice";
import { RootState } from "@/lib/store";
import { PayloadAction } from "@reduxjs/toolkit";

export interface CryptoSliceState {
  data: any[]; // Adjust type according to your data structure
  selectedCrypto: string;
  status: "idle" | "loading" | "failed";
}

const initialState: CryptoSliceState = {
  data: [],
  selectedCrypto: "BTC", // Default selected crypto
  status: "idle",
};

export const cryptoSlice = createAppSlice({
  name: "crypto",
  initialState,
  reducers: (create) => ({
    setSelectedCrypto: create.reducer((state, action: PayloadAction<string>) => {
      state.selectedCrypto = action.payload;
    }),
    setCryptoData: create.reducer((state, action: PayloadAction<any[]>) => {
      state.data = action.payload;
    }),
    setError: create.reducer((state, action: PayloadAction<string | null>) => {
      state.status = "failed";
    }),
  }),
});

// Add extra reducers for handling async actions like WebSocket updates
export const { setSelectedCrypto, setCryptoData, setError } = cryptoSlice.actions;

// Selectors
export const selectCryptoData = (state: RootState) => state.crypto.data;
export const selectSelectedCrypto = (state: RootState) => state.crypto.selectedCrypto;
export const selectCryptoStatus = (state: RootState) => state.crypto.status;

// Reducer
export default cryptoSlice.reducer;
