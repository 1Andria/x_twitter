import { ParamsType } from "@/app/common/Types/Common";
import NavBar from "@/app/components/__molecules/NavBar/NavBar";
import ProfileContext from "@/app/components/__molecules/ProfileContext/ProfileContext";
import SideSection from "@/app/components/__molecules/SideSection/SideSection";
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
        <div className="max-w-[1440px] w-full min-h-screen h-auto  flex">
          <NavBar />
          <ProfileContext pathName={pathName} />
          <SideSection />
        </div>
      </div>
    </>
  );
}

export default Profile;
