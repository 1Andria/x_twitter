"use client";
import {
  usePostData,
  useSearchValue,
  useThemeColors,
} from "@/app/common/hooks/Store";
import React from "react";
import PostItem from "../PostItem/PostItem";
import Search from "../../__atoms/Search/Search";
import ExploreLinks from "../ExploreLinks/ExploreLinks";
import SuggestFollowers from "../SuggestFollowers/SuggestFollowers";

function ExploreContext() {
  const posts = usePostData((state) => state.posts);
  const searchValue = useSearchValue((state) => state.searchValue);
  const FilterByName = posts.filter((post) =>
    post.name.toLocaleLowerCase().includes(searchValue.toLowerCase())
  );
  const contentColor = useThemeColors((state) => state.contentColor);

  return (
    <>
      <div className="max-w-[650px] pt-[10px] w-full min-h-screen h-auto border-r border-r-[#2F3336] mr-[10px] flex flex-col pr-[10px]">
        <div className="max-w-[460px] max-[900px]:max-w-[200px] ml-[17px] w-full mr-[10px] ">
          <Search />
        </div>
        {searchValue.trim() != "" && FilterByName.length > 0 && (
          <h2
            className={` ${
              contentColor === "white" ? "text-black" : "text-white"
            } font-bold text-[24px] ml-[20px] mt-[20px] mb-[10px]`}
          >
            posts:
          </h2>
        )}
        {searchValue.length > 0 &&
          searchValue.trim() != "" &&
          FilterByName.map((post) => <PostItem key={post.id} post={post} />)}
        <h1
          className={`${
            contentColor === "white" ? "text-black" : "text-white"
          } text-[24px] font-bold ml-[20px] mt-[10px] mb-[10px]`}
        >
          Explore:
        </h1>
        <div className="flex  flex-col gap-[20px] ml-[20px]">
          <ExploreLinks />
        </div>
        <SuggestFollowers />
      </div>
    </>
  );
}

export default ExploreContext;
