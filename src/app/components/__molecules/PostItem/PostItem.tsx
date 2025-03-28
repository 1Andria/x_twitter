"use client";
import React from "react";
import { PostContextType } from "@/app/common/Types/Common";
import { auth, db } from "@/app/firebase/config";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import CommentIcon from "@/app/common/icons/CommentIcon";
import ShareIcon from "@/app/common/icons/ShareIcon";
import StatisticIcon from "@/app/common/icons/StatisticIcon";
import DownoloadIcon from "@/app/common/icons/DownoloadIcon";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import ReactTimeAgo from "react-time-ago";
import { useHoverStore } from "@/app/common/hooks/Store";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
TimeAgo.addDefaultLocale(en);

type Props = {
  post: PostContextType;
};

const PostItem = ({ post }: Props) => {
  const currentUserEmail = auth.currentUser?.email;
  const moreColor = useHoverStore((state) => state.moreColor);
  const setMoreColor = useHoverStore((state) => state.setMoreColor);

  const handleLike = async () => {
    if (!currentUserEmail) return;
    const ref = doc(db, "posts", post.id);
    const isLiked = post.likes.includes(currentUserEmail);
    await updateDoc(ref, {
      likes: isLiked
        ? arrayRemove(currentUserEmail)
        : arrayUnion(currentUserEmail),
    });
  };

  const handleBookmark = async () => {
    if (!currentUserEmail) return;
    const ref = doc(db, "posts", post.id);
    const isBookmarked = post.bookmarks.includes(currentUserEmail);
    await updateDoc(ref, {
      bookmarks: isBookmarked
        ? arrayRemove(currentUserEmail)
        : arrayUnion(currentUserEmail),
    });
  };

  return (
    <div className="border border-[#2F3336] p-[15px] flex gap-[8px]">
      <Link
        href={`/profile/${post.username}`}
        className="w-[40px] h-[35px] rounded-[50px] overflow-hidden"
      >
        <Image
          src={post.profilePicture}
          alt="Profile"
          className="w-full h-full object-cover rounded-[50px]"
          width={500}
          height={500}
        />
      </Link>

      <div className="flex flex-col items-start w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-[8px]">
            <Link href={`/profile/${post.username}`}>
              <h3 className="text-white font-bold hover:underline">
                {post.name}
              </h3>
            </Link>
            <h3 className="text-[#71767B] text-[14px] font-semibold">
              @{post.authorEmail.split("@")[0]}
            </h3>
            <div className="w-[3px] h-[3px] rounded-full bg-[#71767B]"></div>
            <h3 className="text-[#71767B] text-[14px] font-semibold">
              {post.createdAt && (
                <ReactTimeAgo date={post.createdAt.toDate()} locale="en-US" />
              )}
            </h3>
          </div>
          <div
            onMouseEnter={() => setMoreColor(post.id)}
            onMouseLeave={() => setMoreColor(null)}
            className="flex gap-[2px] cursor-pointer pt-[15px] pb-[15px] pl-[10px] pr-[10px] rounded-full hover:bg-[#0A171F]"
          >
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-[3px] h-[3px] rounded-full ${
                  moreColor === post.id ? "bg-[#1D9BF0]" : "bg-[#71767B]"
                }`}
              ></div>
            ))}
          </div>
        </div>

        <h1 className="text-white">{post.text}</h1>

        {post.imageUrl && (
          <div className="w-full pr-[10px] max-h-[500px]">
            <Image
              height={700}
              width={700}
              src={post.imageUrl}
              alt="Post Image"
              className="mt-[10px] w-full h-full max-w-full rounded-[20px]"
            />
          </div>
        )}

        <div className="w-full h-[40px] flex items-center justify-between mt-[25px] pr-[10px]">
          <div className="flex items-center">
            <div className="w-[20px] h-[20px]">
              <CommentIcon />
            </div>
            <h3 className="text-[#6D7176]">2k</h3>
          </div>
          <div className="flex items-center">
            <div className="w-[20px] h-[20px]">
              <ShareIcon />
            </div>
            <h3 className="text-[#6D7176]">2k</h3>
          </div>
          <div className="flex items-center">
            <Checkbox
              checked={post.likes.includes(currentUserEmail || "")}
              onChange={handleLike}
              icon={<FavoriteBorder sx={{ color: "#6D7176" }} />}
              checkedIcon={<Favorite sx={{ color: "red" }} />}
            />
            <h3 className="text-[#6D7176]">{post.likes.length}</h3>
          </div>
          <div className="flex items-center">
            <div className="w-[20px] h-[20px]">
              <StatisticIcon />
            </div>
            <h3 className="text-[#6D7176]">2k</h3>
          </div>
          <div className="flex items-center">
            <Checkbox
              checked={post.bookmarks.includes(currentUserEmail || "")}
              onChange={handleBookmark}
              icon={<BookmarkBorderIcon sx={{ color: "#6D7176" }} />}
              checkedIcon={<BookmarkIcon sx={{ color: "rgb(29, 155, 240)" }} />}
            />
            <div className="w-[20px] h-[20px]">
              <DownoloadIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
