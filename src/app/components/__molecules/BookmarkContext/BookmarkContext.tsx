"use client";
import React from "react";
import { usePostData } from "@/app/common/hooks/Store";
import { auth } from "@/app/firebase/config";
import PostItem from "../PostItem/PostItem";
import PostFetcher from "@/app/common/functions/PostFetcher";
import ArrowIcon from "@/app/common/icons/ArrowIcon";

function BookmarkContext() {
  const posts = usePostData((state) => state.posts);
  const currentUserEmail = auth.currentUser?.email;
  const bookmarkedPosts = posts.filter((post) =>
    post.bookmarks.includes(currentUserEmail || "")
  );
  const hasBookmarks = bookmarkedPosts.length > 0;

  return (
    <>
      <div className="max-w-[650px] w-full min-h-screen h-auto border-r border-r-[#2F3336]">
        <PostFetcher />
        {!hasBookmarks && (
          <div className="w-full h-full flex flex-col items-center">
            <h2 className="text-white  font-semibold text-[30px] mt-[50px] text-start">
              Save posts for later
            </h2>
            <p className="text-[#71767B]">
              Bookmark posts to easily find them again in the future.
            </p>
          </div>
        )}

        {hasBookmarks && (
          <>
            <div className="w-full sticky top-0 pl-[15px] h-[60px] flex bg-black border-b border-b-[#2F3336] items-center gap-[30px]">
              <div className=" gap-[20px] flex items-center justify-center">
                <div className="w-[20px] h-[20px]">
                  <ArrowIcon />
                </div>
                <h1 className="text-white text-[20px] w-full">
                  Bookmarked Posts:
                </h1>
              </div>
            </div>
            {bookmarkedPosts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default BookmarkContext;
