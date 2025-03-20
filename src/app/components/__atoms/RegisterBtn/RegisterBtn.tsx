import { RegisterBtnType } from "@/app/common/types/RegisterBtnType";
import React from "react";

function RegisterBtn({
  btnColor,
  btnTxt,
  btnIcon,
  btnBorder,
  btnFont,
  btnTxtColor,
  FixImageGap,
  hover,
}: RegisterBtnType) {
  return (
    <>
      <div className="max-w-[340px] w-full h-[48px]">
        <button
          className={`w-full h-full ${btnColor} ${btnFont} ${btnBorder} ${btnTxtColor} ${FixImageGap} ${hover} rounded-[25px] flex justify-center items-center gap-[10px] cursor-pointer `}
        >
          <div className="w-[20px] h-[20px]">{btnIcon}</div>
          {btnTxt}
        </button>
      </div>
    </>
  );
}

export default RegisterBtn;
