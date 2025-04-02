import BookmarkContext from "@/app/components/__molecules/BookmarkContext/BookmarkContext";
import NavBar from "@/app/components/__molecules/NavBar/NavBar";
import SideSection from "@/app/components/__molecules/SideSection/SideSection";
import React from "react";
export const metadata = {
  title: "Bookmarks / X",
  description: "Bookmarks page",
};

function bookmarks() {
  return (
    <>
      <div className="w-full bg-black flex justify-center items-center">
        <div className="max-w-[1440px] w-full min-h-screen h-auto  flex">
          <NavBar />
          <BookmarkContext />
          <SideSection />
        </div>
      </div>
    </>
  );
}

export default bookmarks;
