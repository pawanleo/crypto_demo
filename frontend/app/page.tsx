import Image from "next/image";
import CryptoDataList from "./components/Crypto/CryptoDataList";



export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
   <CryptoDataList/>
    </main>
  );
}
