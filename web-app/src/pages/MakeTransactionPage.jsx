import api from "../api";
import WalletContext from "../context/WalletContext";
import React, { useContext, useRef } from "react";
import { toast } from "react-toastify";

const MakeTransactionPage = () => {
  const addressRef = useRef(null);
  const amountRef = useRef(null);

  const walletCtx = useContext(WalletContext);

  async function sendCoin() {
    if (addressRef.current && amountRef.current) {
      if (
        addressRef.current.value.length === 0 ||
        amountRef.current.value.length === 0
      ) {
        toastError("Please enter an address and amount");
        return;
      }

      if (!parseInt(amountRef.current.value)) {
        toastError("Please enter a valid amount");
        return;
      }

      if (parseInt(amountRef.current.value) <= 0) {
        toastError("Amount must be greater than 0");
        return;
      }

      if (parseInt(amountRef.current.value) > walletCtx.wallet.balance) {
        toastError("Amount must be less than your balance");
        return;
      }

      console.log(amountRef.current.value);
      const response = await api.post("/transaction/send", {
        privateKey: walletCtx.wallet.privateKey,
        address: addressRef.current.value,
        amount: parseInt(amountRef.current.value),
      });

      if (response.status === 200) {
        toast.success("Transaction is pending now");
        amountRef.current.value = "";
      }
    }
  }

  return (
    <div className="p-10">
      <div className="text-3xl font-medium">Make a transaction</div>
      <div className="w-1/2 bg-white rounded-lg mt-10 p-8">
        <div className="text text-lg font-semibold">
          Information of Transaction
        </div>
        <div className="mt-6">
          <div>
            <label className="block mb-2">Receiver address</label>
            <input
              type="text"
              ref={addressRef}
              placeholder="Enter receiver address"
              className="border rounded-md px-3 py-2 border-sky-700 focus:outline-none w-full"
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2">Amount</label>
            <input
              type="text"
              ref={amountRef}
              placeholder="Enter amount"
              className="border rounded-md px-3 py-2 border-sky-700 focus:outline-none w-full"
            />
          </div>
        </div>

        <div className="flex justify-end mt-3">
          <button
            className="rounded-lg px-6 py-2.5 text-white bg-indigo-900 hover:brightness-110 cursor-pointer"
            onClick={sendCoin}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

function toastError(mss) {
  toast.error(mss);
}

export default MakeTransactionPage;
