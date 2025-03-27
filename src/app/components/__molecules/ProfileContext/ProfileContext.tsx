"use client";
import ArrowIcon from "@/app/common/icons/ArrowIcon";
import { PropsType } from "@/app/common/Types/Common";
import { auth, db } from "@/app/firebase/config";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  getDoc,
} from "firebase/firestore";
import React, { ChangeEvent, useEffect, useState } from "react";

function ProfileContext({ pathName }: PropsType) {
  const [name, setName] = useState<string>("");
  const [postsCount, setPostsCount] = useState<number>(0);
  const [profilePicture, setProfilePicture] = useState<string>(
    "https://i.pinimg.com/736x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg"
  );

  const cleanPathName = Array.isArray(pathName) ? pathName[0] : pathName;

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      const userQuery = query(
        collection(db, "users"),
        where("username", "==", cleanPathName)
      );
      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        const userData = userSnapshot.docs[0].data();
        setName(userData.name);

        setProfilePicture(
          userData.profilePicture ||
            "https://i.pinimg.com/736x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg"
        );

        const postsQuery = query(
          collection(db, "posts"),
          where("authorEmail", "==", userData.email)
        );
        const postsSnapshot = await getDocs(postsQuery);
        setPostsCount(postsSnapshot.size);
      } else {
        console.warn("No user found with that username");
      }
    };

    fetchUserAndPosts();
  }, [cleanPathName]);

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      if (reader.result) {
        const imageURL = reader.result.toString();
        setProfilePicture(imageURL);

        const user = auth.currentUser;
        if (!user) return;

        const userRef = doc(db, "users", user.uid);
        try {
          await updateDoc(userRef, {
            profilePicture: imageURL,
          });
        } catch (error) {
          console.error("Error updating profile picture: ", error);
        }
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-[650px] relative w-full min-h-screen h-auto border-r border-r-[#2F3336]">
      <div className="w-full sticky top-0 pl-[15px] h-[60px] flex bg-black border-b border-b-[#2F3336] items-center gap-[30px]">
        <div className="w-[50px] h-[50px] rounded-[50px] flex items-center justify-center">
          <div className="w-[20px] h-[20px]">
            <ArrowIcon />
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-white font-bold text-[20px]">{name || "..."}</h1>
          <p className="text-[#71767B]">{postsCount} posts</p>
        </div>
      </div>

      <div className="w-[100px] h-[100px] mt-[20px] ml-[15px] rounded-[50px] overflow-hidden bg-[#3e3e3e]">
        {profilePicture ? (
          <img
            src={profilePicture}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <p className="text-white text-center pt-[35px] text-sm">No Photo</p>
        )}
      </div>

      <form className="ml-[15px] mt-[10px]">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="text-white"
        />
      </form>
    </div>
  );
}

export default ProfileContext;
