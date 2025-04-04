import MessagesContext from "@/app/components/__molecules/MessagesContext/MessagesContext";
import NavBar from "@/app/components/__molecules/NavBar/NavBar";
import SideSection from "@/app/components/__molecules/SideSection/SideSection";
import React from "react";

export const metadata = {
  title: "Messages / X",
  description: "Messages page",
};

function Messages() {
  return (
    <>
      <div className="w-full bg-black flex justify-center items-center">
        <div className="max-w-[1440px] w-full min-h-screen h-auto  flex">
          <NavBar />
          <MessagesContext />
          <SideSection />
        </div>
      </div>
    </>
  );
}

export default Messages;
