import React from "react";
import SuggestFollowers from "../../__molecules/SuggestFollowers/SuggestFollowers";

function SideSectionSuggest() {
  return (
    <>
      <div className="w-full mt-[20px] h-auto  pl-[10px] pr-[10px] border-[#2F3336] border-[1px] rounded-[20px]">
        <SuggestFollowers hidden="hidden" />
      </div>
    </>
  );
}

export default SideSectionSuggest;
