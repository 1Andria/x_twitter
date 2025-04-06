"use client";
import {
  useForYou,
  usePostImage,
  usePostStore,
  useUserProfile,
} from "@/app/common/hooks/Store";
import React, { useEffect, useState } from "react";
import ForYouBtn from "../../__atoms/ForYouBtn/ForYouBtn";
import AddPost from "../../__molecules/AddPost/AddPost";
import Post from "../../__molecules/Post/Post";
import SuggestFollowers from "../../__molecules/SuggestFollowers/SuggestFollowers";
import PostFetcher from "@/app/common/functions/PostFetcher";
import { auth, db } from "@/app/firebase/config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import UpIcon from "@/app/common/icons/UpIcon";

function HomeContext() {
  const forYou = useForYou((state) => state.forYou);
  const image = usePostImage((state) => state.image);
  const setImage = usePostImage((state) => state.setImage);
  const text = usePostStore((state) => state.text);
  const setText = usePostStore((state) => state.setText);
  const setFile = usePostStore((state) => state.setFile);
  const profilePicture = useUserProfile((state) => state.profilePicture);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      if (scrollY > viewportHeight * 1.5) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handlePostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (text.trim() === "" && !image) {
      alert("Empty post. Either text or image is required.");
      return;
    }

    try {
      setText("");
      setImage("");
      setFile(null);
      await addDoc(collection(db, "posts"), {
        text,
        authorEmail: user?.email,
        createdAt: serverTimestamp(),
        imageUrl: image || null,
        videoUrl: null,
        likes: [],
        bookmarks: [],
      });
    } catch (err) {
      console.error("Error post: ", err);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="max-w-[650px] w-full min-h-screen relative h-auto border-r border-r-[#2F3336] mr-[10px]">
      <PostFetcher />
      {isScrolled && (
        <button
          onClick={scrollToTop}
          className="fixed border-white border-[2px] z-50 text-white font-bold bg-[#1D9BF0] w-[100px] pt-[10px] pb-[10px] top-[30px] left-[43%] hover:opacity-[0.9] rounded-[20px] flex items-center justify-center gap-[8px]"
        >
          <div className="w-[20px] h-[20px]">
            <UpIcon />
          </div>
          Up
        </button>
      )}
      <div className="w-full h-[60px] flex border-b border-b-[#2F3336]">
        <ForYouBtn forYou={forYou} btnTxt="For you" />
        <ForYouBtn forYou={!forYou} btnTxt="Following" />
      </div>

      {forYou && (
        <AddPost
          onSubmit={handlePostSubmit}
          placeholder="What's happening?"
          text={text}
          setText={setText}
          image={image}
          setImage={setImage}
          setFile={setFile}
          profilePicture={profilePicture}
          btnText="Post"
          inputId="post-image"
        />
      )}
      {forYou && <Post />}
      {!forYou && <SuggestFollowers />}
    </div>
  );
}

export default HomeContext;
