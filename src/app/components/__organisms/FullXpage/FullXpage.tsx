"use client";
import { useThemeColors } from "@/app/common/hooks/Store";
import React from "react";
import NavBar from "../../__molecules/NavBar/NavBar";
import HomeContext from "../HomeContext/HomeContext";
import SideSection from "../../__molecules/SideSection/SideSection";

function FullXpage() {
  const contentColor = useThemeColors((state) => state.contentColor);

  return (
    <>
      <div
        className={`w-full bg-[${contentColor}] flex justify-center items-center`}
      >
        <div className="max-w-[1440px] w-full min-h-screen h-auto  flex">
          <NavBar />
          <HomeContext />
          <SideSection />
        </div>
      </div>
    </>
  );
}

export default FullXpage;
