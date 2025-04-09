"use client";
import { useThemeColors } from "@/app/common/hooks/Store";
import React from "react";
import NavBar from "../../__molecules/NavBar/NavBar";
import SideSection from "../../__molecules/SideSection/SideSection";
import ProfileContext from "../../__molecules/ProfileContext/ProfileContext";

type ProfileTypes = {
  pathName: string;
};

function FullProfilePage({ pathName }: ProfileTypes) {
  const contentColor = useThemeColors((state) => state.contentColor);

  return (
    <>
      <div
        className={`w-full bg-[${contentColor}] flex justify-center items-center`}
      >
        <div className="max-w-[1440px] w-full min-h-screen h-auto  flex">
          <NavBar />
          <ProfileContext pathName={pathName} />
          <SideSection />
        </div>
      </div>
    </>
  );
}

export default FullProfilePage;
