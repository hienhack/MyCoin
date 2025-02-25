import api from "../api";
import BlockDetail from "../components/TransactionHistory/BlockDetail";
import LastestBlocks from "../components/TransactionHistory/LastestBlocks";
import LastestTransactions from "../components/TransactionHistory/LastestTransactions";
import TransactionDetail from "../components/TransactionHistory/TransactionDetail";
import React, { useEffect, useState } from "react";

const TransactionHistory = () => {
  const [blocks, setBlocks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    const fetchBlocks = async () => {
      const res = await api.get("/block");
      if (res.status === 200) {
        console.log(res);
        setBlocks(res.data);
      }
    };

    const fetchTxs = async () => {
      const res = await api.get("/transaction");
      if (res.status === 200) {
        setTransactions(res.data);
      }
    };

    fetchBlocks();
    fetchTxs();
  }, []);

  return (
    <div className="p-10">
      {selectedBlock == null && selectedTransaction == null ? (
        <div>
          {" "}
          <div className="mb-10 text-3xl font-medium">History</div>
          <div className="flex w-full space-x-3">
            <LastestBlocks blocks={blocks} selectBlock={setSelectedBlock} />
            <LastestTransactions
              transactions={transactions}
              selectTransaction={setSelectedTransaction}
            />
          </div>
        </div>
      ) : null}
      {selectedBlock != null ? (
        <BlockDetail
          block={blocks[selectedBlock]}
          index={selectedBlock}
          selectBlock={setSelectedBlock}
        />
      ) : null}
      {selectedTransaction != null ? (
        <TransactionDetail
          transaction={transactions[selectedTransaction]}
          selectTransaction={setSelectedTransaction}
        />
      ) : null}
    </div>
  );
};

export default TransactionHistory;
