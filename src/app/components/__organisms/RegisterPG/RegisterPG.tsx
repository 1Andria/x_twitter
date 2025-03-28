import XIcon from "@/app/common/icons/xIcon";
import React from "react";
import Join from "../../__molecules/Join/Join";

function RegisterPG() {
  return (
    <>
      <div className=" max-w-[1440px] max-[1060px]:justify-center w-full h-auto flex items-center justify-between pl-[50px] pr-[50px] ">
        <div className="w-[500px] h-[500px] max-[1060px]:hidden">
          <XIcon />
        </div>
        <Join />
      </div>
    </>
  );
}

export default RegisterPG;
