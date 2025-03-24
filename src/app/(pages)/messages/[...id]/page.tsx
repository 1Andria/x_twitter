import { ParamsType } from "@/app/common/Types/Common";
import NavBar from "@/app/components/__molecules/NavBar/NavBar";
import React from "react";

export const metadata = {
  title: "Messages / X",
  description: "Messages page",
};

function Messages({ params }: ParamsType) {
  const pathName = params.id;

  return (
    <>
      <div className="w-full bg-black flex justify-center items-center">
        <div className="max-w-[1640px] w-full min-h-screen h-auto  flex">
          <NavBar pathName={pathName} />
        </div>
      </div>
    </>
  );
}

export default Messages;
