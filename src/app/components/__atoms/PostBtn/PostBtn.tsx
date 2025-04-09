"use client";
import { useThemeColors } from "@/app/common/hooks/Store";
import { PostBtnProps } from "@/app/common/Types/Common";
import React from "react";

function PostBtn({ disabled, btnText }: PostBtnProps) {
  const contentColor = useThemeColors((state) => state.contentColor);

  return (
    <>
      {contentColor != "white" && (
        <button
          disabled={disabled}
          type="submit"
          className={`w-[70px] h-[35px] ${
            disabled ? "bg-[#787A7A] cursor-auto" : "bg-white cursor-pointer"
          }  text-black font-semibold rounded-[30px]`}
        >
          {btnText}
        </button>
      )}
      {contentColor === "white" && (
        <button
          disabled={disabled}
          type="submit"
          className={`w-[70px] h-[35px] ${
            disabled ? "bg-[#787A7A] cursor-auto" : "bg-black cursor-pointer"
          }  text-white font-semibold rounded-[30px]`}
        >
          {btnText}
        </button>
      )}
    </>
  );
}

export default PostBtn;
