import { ParamsType } from "@/app/common/Types/Common";
import NavBar from "@/app/components/__molecules/NavBar/NavBar";
import React from "react";

export const metadata = {
  title: "Explore / X",
  description: "Explore page",
};

function Explore({ params }: ParamsType) {
  const pathName = params.id;
  return (
    <>
      <div className="w-full bg-black flex justify-center items-center">
        <div className="max-w-[1640px] w-full min-h-screen h-auto  flex">
          <NavBar />
        </div>
      </div>
    </>
  );
}

export default Explore;
