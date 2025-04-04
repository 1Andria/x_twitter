import React from "react";
import Search from "../../__atoms/Search/Search";
import Subscribe from "../../__atoms/Subscribe/Subscribe";
import SideSectionExplore from "../SideSectionExplore/SideSectionExplore";

function SideSection() {
  return (
    <>
      <div className="w-[380px] sticky top-0 ml-[20px] h-screen pt-[10px] flex flex-col">
        <Search />
        <Subscribe />
        <SideSectionExplore />
      </div>
    </>
  );
}

export default SideSection;
