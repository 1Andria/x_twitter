import { ParamsType } from "@/app/common/Types/Common";
import NavBar from "@/app/components/__molecules/NavBar/NavBar";
import NotificationContext from "@/app/components/__molecules/NotificationContext/NotificationContext";
import React from "react";

export const metadata = {
  title: "Notification / X",
  description: "Notification page",
};

function Notification({ params }: ParamsType) {
  const pathName = params.id;

  return (
    <>
      <div className="w-full bg-black flex justify-center items-center">
        <div className="max-w-[1640px] w-full min-h-screen h-auto  flex">
          <NavBar />
          <div className="max-w-[650px] w-full min-h-screen h-auto border-r border-r-[#2F3336]">
            <NotificationContext />
          </div>
        </div>
      </div>
    </>
  );
}

export default Notification;
