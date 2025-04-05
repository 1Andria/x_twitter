"use client";
import { useSearchValue } from "@/app/common/hooks/Store";
import SearchingIcon from "@/app/common/icons/SearchingIcon";
import React from "react";

function Search() {
  const setSearchValue = useSearchValue((state) => state.setSearchValue);

  return (
    <>
      <div className="w-full relative">
        <input
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search..."
          type="text"
          className="w-full h-[45px] bg-transparent text-white rounded-[20px] 
focus:outline-none focus:border-[#1A8CD8] border-[2px] border-[#2F3336] pl-[35px] text-[18px]"
        />
        <div className="w-[20px] h-[20px] absolute left-[10px] top-[12px]">
          <SearchingIcon />
        </div>
      </div>
    </>
  );
}

export default Search;
