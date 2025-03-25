import { useForYou } from "@/app/common/hooks/Store";
import { ForYouBtnType } from "@/app/common/Types/Common";
import React from "react";

function ForYouBtn({ forYou, btnTxt }: ForYouBtnType) {
  const ChangeForYou = useForYou((state) => state.setForYou);

  return (
    <>
      <button
        onClick={ChangeForYou}
        className="w-full h-full flex pt-[15px] items-center justify-center "
      >
        <h1
          className={`h-full align-middle text-white font-semibold  ${
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
