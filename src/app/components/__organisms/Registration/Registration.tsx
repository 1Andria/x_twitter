import React from "react";
import RegisterPG from "../RegisterPG/RegisterPG";
import RegisterLinks from "../../__atoms/RegisterLinks/RegisterLinks";

function Registration() {
  return (
    <>
      <div className="w-full min-h-screen h-auto bg-black flex flex-col items-center justify-between pb-[8px]  ">
        <div className="h-[80px] w-full bg-transparent max-[1218px]:hidden"></div>
        <RegisterPG />
        <RegisterLinks />
      </div>
    </>
  );
}

export default Registration;
