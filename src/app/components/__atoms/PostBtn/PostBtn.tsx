import { PostBtnProps } from "@/app/common/Types/Common";
import React from "react";

function PostBtn({ disabled, btnText }: PostBtnProps) {
  return (
    <>
      <button
        disabled={disabled}
        type="submit"
        className={`w-[70px] h-[35px] ${
          disabled ? "bg-[#787A7A] cursor-auto" : "bg-white cursor-pointer"
        }  text-black font-semibold rounded-[30px]`}
      >
        {btnText}
      </button>
    </>
  );
}

export default PostBtn;
