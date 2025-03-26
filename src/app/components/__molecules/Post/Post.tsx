"use client";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase/config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { PostContextType } from "@/app/common/Types/Common";
import Image from "next/image";
import CommentIcon from "@/app/common/icons/CommentIcon";
import ShareIcon from "@/app/common/icons/ShareIcon";
import { Checkbox } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import StatisticIcon from "@/app/common/icons/StatisticIcon";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DownoloadIcon from "@/app/common/icons/DownoloadIcon";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);
import ReactTimeAgo from "react-time-ago";
import { updateDoc, doc, arrayUnion, arrayRemove } from "firebase/firestore";

function Post() {
  const [posts, setPosts] = useState<PostContextType[]>([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const postsArray: PostContextType[] = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const postData = doc.data();

          const usersRef = collection(db, "users");
          const usersSnapshot = await getDocs(usersRef);

          let userName = "";
          usersSnapshot.forEach((userDoc) => {
            if (userDoc.data().email === postData.authorEmail) {
              userName = userDoc.data().name;
            }
          });

          return {
            id: doc.id,
            text: postData.text,
            imageUrl: postData.imageUrl,
            authorEmail: postData.authorEmail,
            name: userName,
            createdAt: postData.createdAt,
            likes: postData.likes || [],
            bookmarks: postData.bookmarks || [],
          };
        })
      );

      setPosts(postsArray);
    });

    return () => unsubscribe();
  }, []);

  const handleLike = async (postId: string, isLiked: boolean) => {
    const userEmail = auth.currentUser?.email;
    if (!userEmail) return;

    const postRef = doc(db, "posts", postId);

    try {
      await updateDoc(postRef, {
        likes: isLiked ? arrayRemove(userEmail) : arrayUnion(userEmail),
      });
    } catch (error) {
      console.error("Error updating likes: ", error);
    }
  };

  const handleBookmark = async (postId: string, isBookmarked: boolean) => {
    const userEmail = auth.currentUser?.email;
    if (!userEmail) return;

    const postRef = doc(db, "posts", postId);

    try {
      await updateDoc(postRef, {
        bookmarks: isBookmarked
          ? arrayRemove(userEmail)
          : arrayUnion(userEmail),
      });
    } catch (error) {
      console.error("Error updating bookmarks: ", error);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border border-[#2F3336] p-[15px] flex gap-[8px] "
          >
            <div className="w-[40px] h-[40px] rounded-[50px] bg-[green]"></div>
            <div className="flex flex-col items-start w-full">
              <div className="flex items-center gap-[8px] ">
                <h3 className="text-white font-bold ">{post.name}</h3>
                <h3 className="text-[#71767B] text-[14px] font-semibold ">
                  @{post.authorEmail.split("@")[0]}
                </h3>
                <div className="w-[3px] h-[3px] rounded-[50px] bg-[#71767B]"></div>
                <h3 className="text-[#71767B] text-[14px] font-semibold ">
                  {post.createdAt && (
                    <ReactTimeAgo
                      date={post.createdAt.toDate()}
                      locale="en-US"
                    />
                  )}
                </h3>
              </div>
              <h1 className="text-white">{post.text}</h1>
              {post.imageUrl && (
                <div className="w-full  pr-[10px] max-h-[500px]">
                  <Image
                    height={700}
                    width={700}
                    src={post.imageUrl}
                    alt="Post Image"
                    className="mt-[10px] w-full h-full max-w-full rounded-[20px]"
                  />
                </div>
              )}
              <div className="w-full h-[40px]  flex items-center justify-between mt-[25px] pr-[10px]">
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
                    checked={post.likes?.includes(
                      auth.currentUser?.email || ""
                    )}
                    onChange={() =>
                      handleLike(
                        post.id,
                        post.likes?.includes(auth.currentUser?.email || "") ||
                          false
                      )
                    }
                    icon={<FavoriteBorder sx={{ color: "#6D7176" }} />}
                    checkedIcon={<Favorite sx={{ color: "red" }} />}
                  />
                  <h3 className="text-[#6D7176]">{post.likes?.length || 0}</h3>
                </div>
                <div className="flex items-center">
                  <div className="w-[20px] h-[20px]">
                    <StatisticIcon />
                  </div>
                  <h3 className="text-[#6D7176]">2k</h3>
                </div>
                <div className="flex items-center">
                  <Checkbox
                    checked={post.bookmarks.includes(
                      auth.currentUser?.email || ""
                    )}
                    onChange={() =>
                      handleBookmark(
                        post.id,
                        post.bookmarks.includes(auth.currentUser?.email || "")
                      )
                    }
                    icon={<BookmarkBorderIcon sx={{ color: "#6D7176" }} />}
                    checkedIcon={
                      <BookmarkIcon sx={{ color: "rgb(29, 155, 240)" }} />
                    }
                  />
                  <div className="w-[20px] h-[20px]">
                    <DownoloadIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Post;
