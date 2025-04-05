"use client";
import React from "react";
import Search from "../../__atoms/Search/Search";
import Subscribe from "../../__atoms/Subscribe/Subscribe";
import SideSectionExplore from "../SideSectionExplore/SideSectionExplore";
import { usePathname } from "next/navigation";

function SideSection() {
  const path = usePathname();
  return (
    <>
      <div className="w-[380px] max-[1300px]:hidden sticky top-0 ml-[20px] h-screen pt-[10px] flex flex-col">
        {!path.includes("explore") && <Search />}
        <Subscribe />
        {!path.includes("explore") && <SideSectionExplore />}
      </div>
    </>
  );
}

export default SideSection;
