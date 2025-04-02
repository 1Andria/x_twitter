import NavBar from "@/app/components/__molecules/NavBar/NavBar";
import SideSection from "@/app/components/__molecules/SideSection/SideSection";
import SuggestFollowers from "@/app/components/__molecules/SuggestFollowers/SuggestFollowers";
import React from "react";
export const metadata = {
  title: "Communities / X",
  description: "Communities page",
};

function Communities() {
  return (
    <>
      <div className="w-full bg-black flex justify-center items-center">
        <div className="max-w-[1440px] w-full min-h-screen h-auto  flex">
          <NavBar />
          <div className="max-w-[650px] w-full min-h-screen h-auto border-r border-r-[#2F3336]">
            <SuggestFollowers />
          </div>
          <SideSection />
        </div>
      </div>
    </>
  );
}

export default Communities;
