"use client";
import { PropsType } from "@/app/common/Types/Common";
import { auth, db } from "@/app/firebase/config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import ArrowIcon from "@/app/common/icons/ArrowIcon";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Box, Modal } from "@mui/material";
import XIcon from "@/app/common/icons/xIcon";
import PhotoIcon from "@/app/common/icons/PhotoIcon";

function ProfileContext({ pathName }: PropsType) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [postsCount, setPostsCount] = useState<number>(0);
  const [profilePicture, setProfilePicture] = useState<string>(
    "https://i.pinimg.com/736x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg"
  );
  const [coverPhoto, setCoverPhoto] = useState<string>("");
  const [currentUsername, setCurrentUsername] = useState<string>("");
  const cleanPathName = Array.isArray(pathName) ? pathName[0] : pathName;
  const [editProfile, setEditProfile] = useState(false);
  const [toCover, setToCover] = useState(false);
  function ChangeEditProfile() {
    setEditProfile(!editProfile);
    setToCover(false);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setCurrentUsername(userSnap.data().username);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userQuery = query(
        collection(db, "users"),
        where("username", "==", cleanPathName)
      );
      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        const userData = userSnapshot.docs[0].data();
        const email = userData.email;

        setName(userData.name);
        setEmail(email);

        setProfilePicture(
          userData.profilePicture ||
            "https://i.pinimg.com/736x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg"
        );
        setCoverPhoto(userData.coverPhoto || "");

        const postsQuery = query(
          collection(db, "posts"),
          where("authorEmail", "==", email)
        );
        const postsSnapshot = await getDocs(postsQuery);
        setPostsCount(postsSnapshot.size);
      } else {
        console.warn("User not found");
      }
    };

    fetchUserProfile();
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
  const handleCoverUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      if (reader.result) {
        const imageURL = reader.result.toString();
        setCoverPhoto(imageURL);

        const user = auth.currentUser;
        if (!user) return;

        const userRef = doc(db, "users", user.uid);
        try {
          await updateDoc(userRef, {
            coverPhoto: imageURL,
          });
        } catch (error) {
          console.error("Error updating cover photo: ", error);
        }
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-[650px] relative w-full min-h-screen h-auto border-r border-r-[#2F3336]">
      <div className="w-full sticky  top-0 pl-[15px] h-[60px] flex bg-black border-b border-b-[#2F3336] items-center gap-[30px]">
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

      <div className="flex flex-col ">
        <div className="w-full h-[250px] bg-[#333639]">
          {coverPhoto ? (
            <Image
              src={coverPhoto}
              alt="Cover"
              className="w-full h-full object-cover"
              width={1200}
              height={250}
            />
          ) : (
            <div className="w-full h-full bg-transparent"></div>
          )}
        </div>
        <div className="w-full flex justify-between">
          <div className="flex flex-col">
            <div className="w-[130px] mt-[-70px] border-black border-[4px] h-[130px] ml-[15px] rounded-[100%] overflow-hidden bg-[#3e3e3e]">
              {profilePicture && (
                <Image
                  src={profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  width={500}
                  height={500}
                />
              )}
            </div>
            <h1 className="text-white ml-[15px] font-bold text-[20px]">
              {name}
            </h1>
            <h3 className="text-[#71767B] ml-[15px] text-[16px]">{email}</h3>
          </div>
          {currentUsername === cleanPathName && (
            <button
              onClick={ChangeEditProfile}
              className="text-[white] hover:bg-[#111313] border-[1px] mr-[15px] mt-[10px] border-[#536471] h-[40px] pl-[15px] pr-[15px] rounded-[20px]"
            >
              Set up profile
            </button>
          )}
        </div>
      </div>
      <Modal
        open={editProfile}
        onClose={ChangeEditProfile}
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
          {!toCover && (
            <div className="w-[590px] max-[630px]:w-[350px] max-[630px]:pr-[30px] max-[630px]:pl-[30px]  ml-[10px] mr-[10px] h-[640px] rounded-[20px] pr-[65px] pl-[65px] bg-black flex flex-col pt-[15px] pb-[40px] relative  justify-between">
              <div className="w-full flex justify-center">
                <div className="w-[25px] h-[25px]">
                  <XIcon />
                </div>
              </div>
              <div className="mt-[20px]">
                <h2 className="text-white font-semibold text-[30px]">
                  Pick a profile picture
                </h2>
                <p className="text-[#71767B]">
                  Have a favorite selfie? Upload it now.
                </p>
              </div>
              <div className="w-full h-full flex justify-center items-center">
                <div className="w-[200px] mb-[40px] h-[200px] rounded-[100%] border-[3px] border-white relative">
                  <Image
                    src={profilePicture}
                    alt="Profile"
                    className="w-full opacity-[0.7] h-full object-cover border-black border-[1px] rounded-[100%]"
                    width={500}
                    height={500}
                  />

                  <label
                    htmlFor="profileUpload"
                    className="cursor-pointer hover:bg-[#353D44] w-[45px] bg-[#273038] flex justify-center items-center h-[45px] rounded-full absolute top-[40%] left-[40%]"
                  >
                    <div className="w-[20px] h-[20px]">
                      <PhotoIcon />
                    </div>
                  </label>

                  <input
                    type="file"
                    id="profileUpload"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>

              <button
                onClick={() => setToCover(true)}
                className="w-full h-[70px] hover:bg-[#111313] rounded-[30px] bg-black border-[#536471] border-[1px] text-white font-semibold"
              >
                Next
              </button>
            </div>
          )}
          {toCover && (
            <div className="w-[590px] max-[630px]:w-[350px] max-[630px]:pr-[30px] max-[630px]:pl-[30px]  ml-[10px] mr-[10px] h-[640px] rounded-[20px] pr-[65px] pl-[65px] bg-black flex flex-col pt-[15px] pb-[40px] relative  justify-between">
              <div className="w-full flex justify-center">
                <div className="w-[25px] h-[25px]">
                  <XIcon />
                </div>
              </div>
              <div className="mt-[20px]">
                <h2 className="text-white font-semibold text-[30px]">
                  Pick a header
                </h2>
                <p className="text-[#71767B]">
                  People who visit your profile will see it. Show your style.
                </p>
              </div>
              <div className="w-full h-full flex justify-center items-center">
                <div className="w-[300px] mb-[40px] h-[200px] rounded-[30px] border-[3px] border-white relative">
                  <Image
                    src={coverPhoto}
                    alt="Cover"
                    className="w-full opacity-[0.7] h-full object-cover border-black border-[1px] rounded-[30px]"
                    width={1200}
                    height={250}
                  />

                  <label
                    htmlFor="profileUpload"
                    className="cursor-pointer hover:bg-[#353D44] w-[45px] bg-[#273038] flex justify-center items-center h-[45px] rounded-full absolute top-[40%] left-[40%]"
                  >
                    <div className="w-[20px] h-[20px]">
                      <PhotoIcon />
                    </div>
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverUpload}
                    className="hidden"
                  />
                </div>
              </div>

              <button
                onClick={ChangeEditProfile}
                className="w-full h-[70px] hover:bg-[#111313] rounded-[30px] bg-black border-[#536471] border-[1px] text-white font-semibold"
              >
                Finish
              </button>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default ProfileContext;
