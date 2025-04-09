"use client";
import {
  useElementColor,
  useForYou,
  useThemeColors,
} from "@/app/common/hooks/Store";
import { ForYouBtnType } from "@/app/common/Types/Common";
import React from "react";

function ForYouBtn({ forYou, btnTxt }: ForYouBtnType) {
  const ChangeForYou = useForYou((state) => state.setForYou);
  const contentColor = useThemeColors((state) => state.contentColor);
  const elementColor = useElementColor((state) => state.elementColor);

  return (
    <>
      <button
        onClick={ChangeForYou}
        className={` w-full h-full ${
          contentColor === "white"
            ? "hover:bg-[#E7E7E8]"
            : "hover:bg-[#181818] "
        } flex pt-[15px] items-center justify-center `}
      >
        <h1
          className={`h-full align-middle ${
            contentColor === "white" ? "text-black" : "text-white"
          } font-semibold ${
            forYou ? "opacity-[1]" : "opacity-[0.5]"
          } border-b-[3px] ${forYou ? "" : "border-b-transparent"}`}
          style={forYou ? { borderBottomColor: elementColor } : {}}
        >
          {btnTxt}
        </h1>
      </button>
    </>
  );
}

export default ForYouBtn;
