"use client";
import { useThemeColors } from "@/app/common/hooks/Store";
import React from "react";
import NavBar from "../../__molecules/NavBar/NavBar";
import MessagesContext from "../../__molecules/MessagesContext/MessagesContext";
import SideSection from "../../__molecules/SideSection/SideSection";

function FullMessagesPage() {
  const contentColor = useThemeColors((state) => state.contentColor);

  return (
    <>
      <div
        className={`w-full bg-[${contentColor}] flex justify-center items-center`}
      >
        <div className="max-w-[1440px] w-full min-h-screen h-auto  flex">
          <NavBar />
          <MessagesContext />
          <SideSection />
        </div>
      </div>
    </>
  );
}

export default FullMessagesPage;
