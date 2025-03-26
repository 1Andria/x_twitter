import Calendar from "@/app/common/icons/Calendar";
import Gallery from "@/app/common/icons/Gallery";
import Gif from "@/app/common/icons/Gif";
import GrokIcon from "@/app/common/icons/GrokIcon";
import Location from "@/app/common/icons/Location";
import SetIcon from "@/app/common/icons/SetIcon";
import SmileIcon from "@/app/common/icons/SmileIcon";
import React, { ChangeEvent, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import PostBtn from "../../__atoms/PostBtn/PostBtn";
import { usePostImage, usePostStore } from "@/app/common/hooks/Store";
import { db } from "../../../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth } from "../../../firebase/config";

function AddPost() {
  const image = usePostImage((state) => state.image);
  const setImage = usePostImage((state) => state.setImage);
  const text = usePostStore((state) => state.text);
  const setText = usePostStore((state) => state.setText);
  const setFile = usePostStore((state) => state.setFile);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImage(reader.result.toString());
        }
      };
      reader.readAsDataURL(uploadedFile);
    }
  };
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
        authorEmail: user?.email || "anonymous",
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
      <form
        onSubmit={handlePostSubmit}
        className="w-full h-auto min-h-[120px] border-b border-b-[#2F3336] flex items-start pl-[15px] pr-[15px] pt-[20px] gap-[10px]"
      >
        <div className="w-[50px] h-[50px] bg-[green] rounded-[50px]"></div>
        <div className="flex flex-col h-full w-full">
          <div className="w-full h-full pb-[20px] border-b border-b-[#2F3336]">
            <TextareaAutosize
              maxLength={260}
              placeholder="What's happening?"
              className="w-full focus:outline-none text-[20px] text-white bg-transparent resize-none "
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          {image && <img src={image} alt="Chosed image" />}
          <div className="w-full h-[50px] pl-[10px] pr-[10px] mt-[10px] flex  items-center justify-between">
            <div className="flex gap-[14px]">
              <div className="w-[25px] h-[25px] relative">
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer w-full h-full flex items-center justify-center"
                >
                  <Gallery />
                </label>
                <input
                  onChange={handleFileUpload}
                  type="file"
                  id="image-upload"
                  className="hidden"
                />
              </div>
              <div className="w-[25px] h-[25px]">
                <Gif />
              </div>
              <div className="w-[25px] h-[25px]">
                <GrokIcon color="rgb(29, 155, 240)" />
              </div>
              <div className="w-[25px] h-[25px]">
                <SetIcon />
              </div>
              <div className="w-[25px] h-[25px]">
                <SmileIcon />
              </div>
              <div className="w-[25px] h-[25px]">
                <Calendar />
              </div>
              <div className="w-[25px] h-[25px]">
                <Location />
              </div>
            </div>
            <PostBtn />
          </div>
        </div>
      </form>
    </>
  );
}

export default AddPost;
