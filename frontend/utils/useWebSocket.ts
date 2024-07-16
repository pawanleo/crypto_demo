'use client';
import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { setCryptoData, setError } from "@/lib/features/cryptoSlice";

const useWebSocket = (selectedCrypto: string) => {
  const dispatch = useAppDispatch();
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    socket.current = new WebSocket("ws://localhost:3002");

    socket.current.onopen = () => {
      if (socket.current) {
        socket.current.send(
          JSON.stringify({ type: "SELECT_CRYPTO", data: selectedCrypto })
        );
      }
    };

    socket.current.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      dispatch(setCryptoData(newData));
    };

    socket.current.onerror = (error) => {
      dispatch(setError("WebSocket error"));
    };

    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, [dispatch, selectedCrypto]);

  return socket.current;
};

export default useWebSocket;
