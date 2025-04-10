"use client";
import React from "react";
import ExploreLinks from "../ExploreLinks/ExploreLinks";
import { useThemeColors } from "@/app/common/hooks/Store";
function SideSectionExplore() {
  const contentColor = useThemeColors((state) => state.contentColor);

  return (
    <>
      <div className="w-full h-[490px] pl-[15px] pt-[20px] border border-[#2F3336] rounded-[20px] mt-[10px] flex flex-col gap-[20px]">
        <h1
          className={`${
            contentColor === "white" ? "text-black" : "text-white"
          } font-bold text-[20px]`}
        >
          Explore:
        </h1>
        <ExploreLinks />
      </div>
    </>
  );
}

export default SideSectionExplore;
