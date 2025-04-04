import React from "react";
import Search from "../../__atoms/Search/Search";
import Subscribe from "../../__atoms/Subscribe/Subscribe";
import SideSectionSuggest from "../../__atoms/SideSectionSuggest/SideSectionSuggest";

function SideSection() {
  return (
    <>
      <div className="w-[380px] sticky top-0 ml-[20px]  pt-[10px] flex flex-col">
        <Search />
        <Subscribe />
        {/* <SideSectionSuggest /> */}
      </div>
    </>
  );
}

export default SideSection;
