import { ParamsType } from "@/app/common/Types/Common";
import NavBar from "@/app/components/__molecules/NavBar/NavBar";
import ProfileContext from "@/app/components/__molecules/ProfileContext/ProfileContext";
import React from "react";

export const metadata = {
  title: "Profile / X",
  description: "Profile page",
};

function Profile({ params }: ParamsType) {
  const pathName = params.id;

  return (
    <>
      <div className="w-full bg-black flex justify-center items-center">
        <div className="max-w-[1640px] w-full min-h-screen h-auto  flex">
          <NavBar />
          <ProfileContext pathName={pathName} />
        </div>
      </div>
    </>
  );
}

export default Profile;
