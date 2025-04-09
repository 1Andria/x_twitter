"use client";
import { useThemeColors } from "@/app/common/hooks/Store";
import React from "react";
import NavBar from "../../__molecules/NavBar/NavBar";
import NotificationContext from "../../__molecules/NotificationContext/NotificationContext";
import SideSection from "../../__molecules/SideSection/SideSection";

function FullNotificationPage() {
  const contentColor = useThemeColors((state) => state.contentColor);

  return (
    <>
      <div
        className={`w-full bg-[${contentColor}] flex justify-center items-center`}
      >
        <div className="max-w-[1440px] w-full min-h-screen h-auto  flex">
          <NavBar />
          <div className="max-w-[650px] w-full min-h-screen h-auto border-r border-r-[#2F3336]">
            <NotificationContext />
          </div>
          <SideSection />
        </div>
      </div>
    </>
  );
}

export default FullNotificationPage;
