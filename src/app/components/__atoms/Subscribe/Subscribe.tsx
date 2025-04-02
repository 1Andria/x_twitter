import React from "react";

function Subscribe() {
  return (
    <>
      <div className="w-full h-[170px] border-[1px] mt-[20px] border-[#2F3336] rounded-[20px] flex flex-col pt-[10px] pl-[20px] justify-between pb-[10px]">
        <h1 className="text-white text-[25px] font-bold">
          Subscribe to Premium
        </h1>
        <p className="text-white">
          Subscribe to unlock new features and if <br /> eligible, receive a
          share of revenue.
        </p>
        <button className="bg-[#1A8CD8] w-[120px] rounded-[20px] pt-[8px] pb-[8px] text-white font-semibold">
          Subscribe
        </button>
      </div>
    </>
  );
}

export default Subscribe;
