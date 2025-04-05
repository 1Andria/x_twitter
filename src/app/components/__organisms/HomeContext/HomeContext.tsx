"use client";
import {
  useForYou,
  usePostImage,
  usePostStore,
  useUserProfile,
} from "@/app/common/hooks/Store";
import React from "react";
import ForYouBtn from "../../__atoms/ForYouBtn/ForYouBtn";
import AddPost from "../../__molecules/AddPost/AddPost";
import Post from "../../__molecules/Post/Post";
import SuggestFollowers from "../../__molecules/SuggestFollowers/SuggestFollowers";
import PostFetcher from "@/app/common/functions/PostFetcher";
import { auth, db } from "@/app/firebase/config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

function HomeContext() {
  const forYou = useForYou((state) => state.forYou);
  const image = usePostImage((state) => state.image);
  const setImage = usePostImage((state) => state.setImage);
  const text = usePostStore((state) => state.text);
  const setText = usePostStore((state) => state.setText);
  const setFile = usePostStore((state) => state.setFile);
  const profilePicture = useUserProfile((state) => state.profilePicture);

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

  return (
    <div className="max-w-[650px] w-full min-h-screen h-auto border-r border-r-[#2F3336] mr-[10px]">
      <PostFetcher />

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
