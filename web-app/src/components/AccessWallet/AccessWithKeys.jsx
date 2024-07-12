import axios from "axios";
import api from "../../api";
import WalletContext from "../../context/WalletContext";
import { useContext, useRef } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

function AccessWithKeys() {
  const pbKeyRef = useRef(null);
  const pvKeyRef = useRef(null);
  const walletCtx = useContext(WalletContext);

  function accessWallet() {
    if (pbKeyRef.current?.value && pvKeyRef.current?.value) {
      const pbKey = pbKeyRef.current.value;
      const pvKey = pvKeyRef.current.value;

      api
        .post("/wallet/access", {
          publicKey: pbKey,
          privateKey: pvKey,
        })
        .then((response) => {
          walletCtx.setWallet({
            publicKey: response.data.publicKey,
            privateKey: response.data.privateKey,
            balance: response.data.balance,
          });
        })
        .catch((error) => {
          toast.error("Invalid keys");
        });
    } else {
      toast.error("Please fill in all fields");
    }
  }

  if (walletCtx.wallet?.privateKey?.length > 0)
    return <Navigate to={"/wallet"} />;

  return (
    <div className="w-full">
      <div className="text-center text-3xl font-medium my-8">
        Access your Wallet
      </div>
      {/* Public key */}
      <div className="w-full flex justify-center">
        <div className="w-3/4">
          <div className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">
            Public key
          </div>
          <div>
            <input
              type="text"
              ref={pbKeyRef}
              placeholder="Enter your public key"
              className="w-full border rounded-md px-3 py-3 focus:outline-none focus:border-indigo-800"
              required
            />
          </div>
        </div>
      </div>

      {/* Private key */}
      <div className="w-full flex justify-center mt-6">
        <div className="w-3/4">
          <div className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">
            Private key
          </div>
          <div>
            <input
              type="text"
              ref={pvKeyRef}
              placeholder="Enter your private key"
              className="w-full border rounded-md px-3 py-3 focus:outline-none focus:border-indigo-800"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <div
          className="w-1/3 py-2 border border-indigo-700 hover:bg-indigo-800 rounded-lg text-indigo-700 hover:text-white text-center text-base cursor-pointer transition-colors ease-in-out delay-150"
          onClick={accessWallet}
        >
          Access Wallet
        </div>
      </div>
    </div>
  );
}

export default AccessWithKeys;
