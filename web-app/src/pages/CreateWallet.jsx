import api from "../api";
import { useRef, useState } from "react";
import KeyBtn from "../components/CreateWallet/KeyBtn";
import BtnGenerateWallet from "../components/CreateWallet/BtnGenerateWallet";
import BtnDownloadKeys from "../components/CreateWallet/BtnDownloadKeys";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function CreateWallet() {
  const privateKeyRef = useRef(null);
  const publicKeyRef = useRef(null);
  const downloadRef = useRef(null);

  const [downloadable, setDownloadable] = useState(false);

  async function generateWallet() {
    const response = await api.post("/wallet/create");
    const str = JSON.stringify(response.data);
    const bytes = new TextEncoder().encode(str);
    const blob = new Blob([bytes], { type: "" });

    const href = window.URL.createObjectURL(blob);
    const a = downloadRef.current;
    if (a !== null) {
      a.download = "Keys";
      a.href = href;
      setDownloadable(true);
    }
    if (privateKeyRef.current && publicKeyRef.current) {
      privateKeyRef.current.innerText = response.data.privateKey;
      publicKeyRef.current.innerText = response.data.publicKey;
    }
  }

  function copyKey(key) {
    navigator.clipboard.writeText(key);
    toast.success("Copied to clipboard", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <div className="flex justify-center items-center py-10">
      <div className="w-3/4 lg:w-2/3 xl:w-1/2">
        <div className="text-2xl font-bold text-center">
          Create a New Wallet
        </div>

        <div className="mt-5 text-center">
          <span>Already have a wallet? </span>
          <Link to={"/access-wallet"}>
            <span className="text-emerald-400">Access My Wallet</span>
          </Link>
        </div>

        <KeyBtn
          copyKey={copyKey}
          refValue={publicKeyRef}
          content={"Your Public Key"}
        />

        <KeyBtn
          copyKey={copyKey}
          refValue={privateKeyRef}
          content={"Your Private Key"}
        />

        <div className="w-full sm:flex sm:space-x-3 justify-between">
          <BtnGenerateWallet generateWallet={generateWallet} />
          <BtnDownloadKeys downloadable={downloadable} refVal={downloadRef} />
        </div>

        <div className="text-center mt-10">
          <span className="text-red-500">DO NOT FORGET</span> to save your
          <span className="text-emerald-400"> PRIVATE KEY</span> and{" "}
          <span className="text-emerald-400">PUBLIC KEY</span>
        </div>
      </div>
    </div>
  );
}

export default CreateWallet;
