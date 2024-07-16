import type { Metadata } from "next";
import CryptoDataDisplay from "./components/Crypto/CrytpoDataDisplay";



export default function IndexPage() {
  return <CryptoDataDisplay/>;
}

export const metadata: Metadata = {
  title: "Crypto Project",
};
