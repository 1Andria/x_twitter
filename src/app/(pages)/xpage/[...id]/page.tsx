import { ParamsType } from "@/app/common/Types/Common";
import NavBar from "@/app/components/__molecules/NavBar/NavBar";
import HomeContext from "@/app/components/__organisms/HomeContext/HomeContext";
import React from "react";
export const metadata = {
  title: "Home / X",
  description: "Home page",
};

function xpage({ params }: ParamsType) {
  const pathName = params.id;

  return (
    <div className="w-full bg-black flex justify-center items-center">
      <div className="max-w-[1640px] w-full min-h-screen h-auto  flex">
        <NavBar />
        <HomeContext />
      </div>
    </div>
  );
}

export default xpage;
