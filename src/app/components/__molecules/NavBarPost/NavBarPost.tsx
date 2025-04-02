"use client";
import {
  useNavBarPost,
  usePostImage,
  usePostStore,
  useUserProfile,
} from "@/app/common/hooks/Store";
import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
import AddPost from "../AddPost/AddPost";
import { auth, db } from "@/app/firebase/config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

function NavBarPost() {
  const navBarPost = useNavBarPost((state) => state.navBarPost);
  const setNavBarPost = useNavBarPost((state) => state.setNavBarPost);
  const image = usePostImage((state) => state.image);
  const setImage = usePostImage((state) => state.setImage);
  const text = usePostStore((state) => state.text);
  const setText = usePostStore((state) => state.setText);
  const setFile = usePostStore((state) => state.setFile);
  const profilePicture = useUserProfile((state) => state.profilePicture);

  function CloseNavBarPost() {
    setNavBarPost(false);
  }

  const handlePostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNavBarPost(false);
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
    <>
      <Modal
        open={navBarPost}
        onClose={CloseNavBarPost}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "rgba(36, 45, 52, 0.5)",
              opacity: "0.5",
            },
          },
        }}
        className="w-full"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-[570px] max-[630px]:w-[350px]  ml-[10px] mr-[10px] h-auto  rounded-[20px]  bg-black flex flex-col pt-[30px]   relative items-center justify-between">
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
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default NavBarPost;
