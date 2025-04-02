"use client";
import { useSearchValue } from "@/app/common/hooks/Store";
import SearchingIcon from "@/app/common/icons/SearchingIcon";
import React from "react";

function SideSection() {
  const setSearchValue = useSearchValue((state) => state.setSearchValue);

  return (
    <>
      <div className="w-[400px] ml-[20px] h-[100px] mt-[10px] flex flex-col">
        <div className="w-full relative">
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            className="w-full h-[50px] bg-transparent text-white rounded-[20px] 
        focus:outline-[#1A8CD8] border-[2px] border-[#2F3336] pl-[35px] text-[18px]"
          />
          <div className="w-[20px] h-[20px] absolute left-[10px] top-[15px]">
            <SearchingIcon />
          </div>
        </div>
      </div>
    </>
  );
}

export default SideSection;
