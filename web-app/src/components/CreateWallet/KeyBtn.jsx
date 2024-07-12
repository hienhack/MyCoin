import React from "react";

function KeyBtn({ copyKey, refValue, content }) {
  return (
    <div className="w-full flex justify-between items-center border border-gray-400 hover:border-emerald-400 rounded-md px-4 py-4 mt-10">
      <div
        className="text-gray-400 italic whitespace-nowrap overflow-hidden overflow-ellipsis"
        ref={refValue}
      >
        <span>{content}</span>
      </div>
      <div
        className="w-[24px] min-w-[24px] text-gray-400 hover:text-emerald-400 cursor-pointer ml-2"
        onClick={() => copyKey(refValue.current?.innerText)}
        title="Copy"
      ></div>
    </div>
  );
}

export default KeyBtn;
