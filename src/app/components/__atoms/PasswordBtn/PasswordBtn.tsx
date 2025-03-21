import { PasswordBtnProps } from "@/app/common/types/PasswordBtnProps";
import React from "react";

function PasswordBtn({ password }: PasswordBtnProps) {
  const isDisabled = !password;
  return (
    <>
      <button
        disabled={isDisabled}
        type="submit"
        className="w-full h-[60px] rounded-[40px] bg-white text-[16px] font-bold disabled:bg-[#787A7A]"
      >
        Sign up
      </button>
    </>
  );
}

export default PasswordBtn;
