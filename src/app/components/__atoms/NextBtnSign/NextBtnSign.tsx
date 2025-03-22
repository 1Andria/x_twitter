import { useDate } from "@/app/common/hooks/Store";
import { NextBtnProps } from "@/app/common/Types/Common";
import React from "react";

function NextBtnSign({ name, email }: NextBtnProps) {
  const selectedMonth = useDate((state) => state.selectedMonth);
  const selectedDay = useDate((state) => state.selectedDay);
  const selectedYear = useDate((state) => state.selectedYear);
  const isDisabled =
    !name || !email || !selectedMonth || !selectedDay || !selectedYear;

  return (
    <>
      <button
        disabled={isDisabled}
        type="submit"
        className="w-full h-[60px] rounded-[40px] bg-white text-[16px] font-bold disabled:bg-[#787A7A]"
      >
        Next
      </button>
    </>
  );
}

export default NextBtnSign;
