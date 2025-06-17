"use client";
import { PropsType } from "@/app/common/Types/Common";
import { auth, db } from "@/app/firebase/config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Box, Modal } from "@mui/material";
import {
  useCover,
  useEditProfile,
  useElementColor,
  useLogInStore,
  usePostData,
  useProfileContext,
  useThemeColors,
  useUserProfile,
} from "@/app/common/hooks/Store";
import ProfilePictureUpload from "../ProfilePictureUpload/ProfilePictureUpload";
import CoverPictureUpload from "../CoverPictureUpload/CoverPictureUpload";
import ProfileBtn from "../../__atoms/ProfileBtn/ProfileBtn";
import PostItem from "../PostItem/PostItem";
import SuggestFollowers from "../SuggestFollowers/SuggestFollowers";
import PostFetcher from "@/app/common/functions/PostFetcher";

function ProfileContext({ pathName }: PropsType) {
  const cleanPathName = Array.isArray(pathName) ? pathName[0] : pathName;
  const [currentUsername, setCurrentUsername] = useState<string>("");
  const [activeTab, setActiveTab] = useState("Posts");
  const email = useLogInStore((state) => state.email);
  const setEmail = useLogInStore((state) => state.setEmail);
  const postsCount = useUserProfile((state) => state.postsCount);
  const setPostsCount = useUserProfile((state) => state.setPostsCount);
  const coverPhoto = useUserProfile((state) => state.coverPhoto);
  const setCoverPhoto = useUserProfile((state) => state.setCoverPhoto);
  const editProfile = useEditProfile((state) => state.editProfile);
  const setEditProfile = useEditProfile((state) => state.setEditProfile);
  const toCover = useCover((state) => state.toCover);
  const setToCover = useCover((state) => state.setToCover);
  const name = useUserProfile((state) => state.name);
  const setName = useUserProfile((state) => state.setName);
  const following = useUserProfile((state) => state.followingCount);
  const setFollowersCount = useUserProfile((state) => state.setFollowersCount);
  const setFollowingCount = useUserProfile((state) => state.setFollowingCount);
  const followers = useUserProfile((state) => state.followersCount);
  const posts = usePostData((state) => state.posts);
  const UserPost = posts.filter((post) => post.authorEmail === email);
  const LikedPosts = posts.filter((post) => post.likes.includes(email));
  const profilePicture = useProfileContext((state) => state.profilePicture);
  const contentColor = useThemeColors((state) => state.contentColor);

  const setProfilePicture = useProfileContext(
    (state) => state.setProfilePicture
  );
  const elementColor = useElementColor((state) => state.elementColor);

  const bookmarkedPosts = posts.filter((post) =>
    post.bookmarks.includes(email)
  );
  const hasBookmarks = bookmarkedPosts.length > 0;

  const AboutArray = ["Posts", "Bookmarks", "Articles", "Media", "Likes"];

  function ChangeEditProfile() {
    setEditProfile();
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
        const followers = userData.followers || [];
        const following = userData.followings || [];

        setName(userData.name);
        setEmail(email);
        setFollowersCount(followers.length);
        setFollowingCount(following.length);
        setProfilePicture(userData.profilePicture);
        setCoverPhoto(userData.coverPhoto);

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

  return (
    <div className="max-w-[650px] relative w-full min-h-screen h-auto border-r border-r-[#2F3336]">
      <div
        className={`w-full sticky  top-0 pl-[15px] bg-[${contentColor}] h-[60px] flex  border-b border-b-[#2F3336] items-center gap-[30px]`}
      >
        <div className="w-[50px] h-[50px] rounded-[50px] flex items-center justify-center"></div>
        <div className="flex flex-col">
          <h1
            className={` ${
              contentColor === "white" ? "text-black" : "text-white"
            } font-bold text-[20px]`}
          >
            {name || "..."}
          </h1>
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
                  priority
                />
              )}
            </div>
            <h1
              className={`${
                contentColor === "white" ? "text-black" : "text-white"
              } ml-[15px] font-bold text-[20px]`}
            >
              {name}
            </h1>
            <h3 className="text-[#71767B] ml-[15px] text-[16px]">{email}</h3>
            <div className="flex ml-[15px] gap-[10px] mt-[10px]">
              <h1
                className={`${
                  contentColor === "white" ? "text-black" : "text-white"
                }`}
              >
                {following} <span className="text-[#71767B]">following</span>
              </h1>
              <h1
                className={`${
                  contentColor === "white" ? "text-black" : "text-white"
                }`}
              >
                {followers} <span className="text-[#71767B]">followers</span>
              </h1>
            </div>
          </div>
          {currentUsername === cleanPathName && <ProfileBtn />}
        </div>
        <div className="flex  justify-between min-w-[200px] max-[700px]:flex-wrap">
          {AboutArray.map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className={`border-b-[#2F3336] border-b-[1px] h-[50px] w-full mt-[20px] ${
                contentColor === "white"
                  ? "hover:bg-[#E7E7E8]"
                  : "hover:bg-[#181818] "
              } text-[16px] font-semibold transition-colors duration-200 pl-[12px] pr-[12px] ${
                activeTab === item
                  ? contentColor === "white"
                    ? "text-black"
                    : "text-white"
                  : "text-[#71767B]"
              }`}
            >
              <h1
                className={`h-full flex items-center justify-center border-b-[3px] ${
                  activeTab === item ? "border-b-[3px]" : "border-b-transparent"
                }`}
                style={
                  activeTab === item ? { borderBottomColor: elementColor } : {}
                }
              >
                {item}
              </h1>
            </button>
          ))}
        </div>
        {activeTab === "Posts" && (
          <>
            <h1
              className={`${
                contentColor === "white" ? "text-black" : "text-white"
              } text-[20px] font-semibold ml-[10px] mt-[20px] mb-[10px]`}
            >
              {currentUsername === cleanPathName
                ? `Your posts:`
                : `${name}'s posts:`}
            </h1>
            {UserPost.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </>
        )}
        {activeTab === "Bookmarks" &&
          !hasBookmarks &&
          currentUsername === cleanPathName && (
            <div className="w-full h-full flex flex-col items-center">
              <h2
                className={` ${
                  contentColor === "white" ? "text-black" : "text-white"
                } font-semibold text-[30px] mt-[50px] text-start`}
              >
                Save posts for later
              </h2>
              <p className="text-[#71767B]">
                Bookmark posts to easily find them again in the future.
              </p>
            </div>
          )}
        {activeTab === "Bookmarks" &&
          !hasBookmarks &&
          currentUsername != cleanPathName && (
            <h1
              className={`${
                contentColor === "white" ? "text-black" : "text-white"
              } text-[20px] font-semibold ml-[10px] mt-[20px] mb-[10px]`}
            >
              This information is private
            </h1>
          )}
        {activeTab === "Bookmarks" && hasBookmarks && (
          <>
            {currentUsername === cleanPathName && (
              <>
                <h1
                  className={`${
                    contentColor === "white" ? "text-black" : "text-white"
                  } text-[20px] font-semibold ml-[10px] mt-[20px] mb-[10px]`}
                >
                  Posts you have bookmarked:
                </h1>
                {bookmarkedPosts.map((post) => (
                  <PostItem key={post.id} post={post} />
                ))}
              </>
            )}
          </>
        )}
        {activeTab === "Articles" && (
          <>
            <h1
              className={`${
                contentColor === "white" ? "text-black" : "text-white"
              } text-[20px] font-semibold ml-[10px] mt-[20px] mb-[10px]`}
            >
              {currentUsername === cleanPathName
                ? `Your articles:`
                : `${name}'s articles:`}
            </h1>
            {UserPost.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </>
        )}
        {activeTab === "Media" && (
          <div className="max-w-[650px] w-full min-h-screen h-auto border-r border-r-[#2F3336]">
            <SuggestFollowers />
          </div>
        )}
        {activeTab === "Likes" && (
          <>
            {currentUsername === cleanPathName ? (
              <>
                <h1
                  className={`${
                    contentColor === "white" ? "text-black" : "text-white"
                  } text-[20px] font-semibold ml-[10px] mt-[20px] mb-[10px]`}
                >
                  Posts you have liked:
                </h1>
                {LikedPosts.map((post) => (
                  <PostItem key={post.id} post={post} />
                ))}
              </>
            ) : (
              <h1
                className={`${
                  contentColor === "white" ? "text-black" : "text-white"
                } text-[20px] font-semibold ml-[10px] mt-[20px] mb-[10px]`}
              >
                This information is private
              </h1>
            )}
          </>
        )}
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
          {!toCover && <ProfilePictureUpload />}
          {toCover && <CoverPictureUpload />}
        </Box>
      </Modal>
      <PostFetcher />
    </div>
  );
}

export default ProfileContext;
