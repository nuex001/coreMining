import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useWalletClient } from "wagmi";
import axios from "axios";

function App() {
  const [userToken, setUserToken] = useState(null);
  const [address, setAddress] = useState(null);
  const { data: walletClient } = useWalletClient();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    // console.log(token);
    if (token && token !== "") {
      setUserToken(token);
    }
  }, []);
  const getAndsaveAddress = async () => {
    if (walletClient) {
      const accounts = await walletClient.getAddresses();
      setAddress(accounts[0]);
    }
  };
  // 
  const saveAddressDb = async () => {
    if (address && userToken) {
        axios.defaults.headers.common["auth-token"] = userToken;
        const response = await axios.put(
          `coremining-production.up.railway.app/api/user/address`,
          {address:address}
        );
    }
  };
  useEffect(() => {
    if (walletClient) {
      getAndsaveAddress();
    }
  }, [walletClient]);
  useEffect(() => {
    if (address && userToken) {
      saveAddressDb();
    }
  }, [address, userToken]);
  return (
    <div className="container">
      <h1>Connect Wallet</h1>
      <p>PS: Connect wallet and go back to our telegram app</p>
      <p>If it doesn't work, go back and click link again</p>
      <ConnectButton />
    </div>
  );
}

export default App;
