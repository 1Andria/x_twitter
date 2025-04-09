"use client";
import { useForYou, useThemeColors } from "@/app/common/hooks/Store";
import { ForYouBtnType } from "@/app/common/Types/Common";
import React from "react";

function ForYouBtn({ forYou, btnTxt }: ForYouBtnType) {
  const ChangeForYou = useForYou((state) => state.setForYou);
  const contentColor = useThemeColors((state) => state.contentColor);

  return (
    <>
      <button
        onClick={ChangeForYou}
        className="w-full h-full hover:opacity-[0.7] flex pt-[15px] items-center justify-center "
      >
        <h1
          className={`h-full align-middle ${
            contentColor === "white" ? "text-black" : "text-white"
          } font-semibold  ${
            forYou ? "opacity-[1]" : "opacity-[0.5]"
          } border-b-[3px] ${
            forYou ? "border-b-[#1D9BF0]" : "border-b-transparent"
          }`}
        >
          {btnTxt}
        </h1>
      </button>
    </>
  );
}

export default ForYouBtn;
