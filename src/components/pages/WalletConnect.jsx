import { useEffect, useState } from "react";
import "../../assets/css/wallet.css";
import { CiWallet } from "react-icons/ci";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/CoreMining";
function WalletConnect() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.CoreMining);
  const [address, setAddress] = useState(null);
  useEffect(() => {
    if (user) {
      setAddress(user.address);
    } else {
      dispatch(getUser());
    }
  }, [user]);
  return (
    <div className="walletcont">
      {address ? <h1>Wallet Connected</h1> : <h1>Connect Wallet</h1>}
      <p>
        PS: yo will be redirected to your browser to connect your wallet and it
        will reflect here
      </p>
      {address ? (
        <a href={`https://coreconnectwallet.netlify.app?token=${sessionStorage.getItem("token")}`} target="_blank">
          Chnage Wallet
        </a>
      ) : (
        <a href="#" target="_blank">
          connect
        </a>
      )}
    </div>
  );
}

export default WalletConnect;
