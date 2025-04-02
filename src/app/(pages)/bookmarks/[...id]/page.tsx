import { ParamsType } from "@/app/common/Types/Common";
import BookmarkContext from "@/app/components/__molecules/BookmarkContext/BookmarkContext";
import NavBar from "@/app/components/__molecules/NavBar/NavBar";
import React from "react";
export const metadata = {
  title: "Bookmarks / X",
  description: "Bookmarks page",
};

function bookmarks({ params }: ParamsType) {
  const pathName = params.id;

  return (
    <>
      <div className="w-full bg-black flex justify-center items-center">
        <div className="max-w-[1440px] w-full min-h-screen h-auto  flex">
          <NavBar />
          <BookmarkContext />
        </div>
      </div>
    </>
  );
}

export default bookmarks;
