"use client";
import { useForYou } from "@/app/common/hooks/Store";
import React from "react";
import ForYouBtn from "../../__atoms/ForYouBtn/ForYouBtn";
import AddPost from "../../__molecules/AddPost/AddPost";
import Post from "../../__molecules/Post/Post";
import SuggestFollowers from "../../__molecules/SuggestFollowers/SuggestFollowers";

function HomeContext() {
  const forYou = useForYou((state) => state.forYou);

  return (
    <div className="max-w-[650px] w-full min-h-screen h-auto border-r border-r-[#2F3336]">
      <div className="w-full h-[60px] flex border-b border-b-[#2F3336]">
        <ForYouBtn forYou={forYou} btnTxt="For you" />
        <ForYouBtn forYou={!forYou} btnTxt="Following" />
      </div>
      {forYou && <AddPost />}
      {forYou && <Post />}
      {!forYou && <SuggestFollowers />}
    </div>
  );
}

export default HomeContext;
