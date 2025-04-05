import ExploreContext from "@/app/components/__molecules/ExploreContext/ExploreContext";
import NavBar from "@/app/components/__molecules/NavBar/NavBar";
import SideSection from "@/app/components/__molecules/SideSection/SideSection";
import React from "react";

export const metadata = {
  title: "Explore / X",
  description: "Explore page",
};

function Explore() {
  return (
    <>
      <div className="w-full bg-black flex justify-center items-center">
        <div className="max-w-[1440px] w-full min-h-screen h-auto  flex">
          <NavBar />
          <ExploreContext />
          <SideSection />
        </div>
      </div>
    </>
  );
}

export default Explore;
