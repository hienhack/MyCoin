import formatDate from "../../helpers/formatDate";
import React, { useEffect, useState } from "react";

const LastestBlocks = ({ blocks, selectBlock }) => {
  const [index, setIndex] = useState(0);
  const [showBlocks, setShowBlocks] = useState([]);

  useEffect(() => {
    setShowBlocks(blocks.slice(index * 8, index + 8));
  }, [index, blocks]);

  function changeIndex(idx) {
    setIndex(idx);
  }

  return (
    <div className="w-1/2 px-4 pt-4 bg-white divide-y rounded-lg h-max divide-slate-200">
      <div className="pb-3 ">Lastest Blocks</div>
      {showBlocks.map((block, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between py-2 space-x-6"
        >
          <div className="flex space-x-2 w-1/4">
            <div className="p-3 rounded-md bg-slate-400">BK</div>
            <div className="text-sm">
              <div
                className="cursor-pointer hover:text-blue-700 hover:underline underline-offset-1"
                onClick={() => selectBlock(index * 8 + idx)}
              >
                Block {index * 8 + idx}
              </div>
              <div className="text-xs">{formatDate(block.timestamp)}</div>
            </div>
          </div>
          <div className="w-1/3 2xl:w-1/2 text-sm">
            <div className="truncate">
              <span className="text-blue-700">Miner : </span>
              {block.data.length > 0
                ? block.data[block.data.length - 1].to
                : null}
            </div>
            <div className="text-blue-500">{block.data.length} Txs</div>
          </div>

          <div
            className="w-[100px] text-sm text-blue-500"
            title="Mining Reward"
          >
            {block.data[block.data.length - 1].amount} MC
          </div>
        </div>
      ))}
      <div className="flex justify-between py-4 text-white">
        <div
          className={`px-4 py-2 rounded-md bg-[#071e40] cursor-pointer ${
            index <= 0 ? "opacity-30" : ""
          }`}
          onClick={() => {
            if (index > 0) {
              changeIndex(index - 1);
            }
          }}
        >
          Prev
        </div>

        <div
          className={`px-4 py-2 rounded-md bg-[#071e40] cursor-pointer ${
            blocks.length - (index + 1) * 8 <= 0 ? "opacity-30" : ""
          }`}
          onClick={() => {
            if (blocks.length - (index + 1) * 8 > 0) {
              changeIndex(index + 1);
            }
          }}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default LastestBlocks;
