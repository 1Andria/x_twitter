"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/app/firebase/config";
import {
  useCurrentUser,
  useNavBarPost,
  useUserProfile,
} from "@/app/common/hooks/Store";
import XIcon from "@/app/common/icons/xIcon";
import HomeIcon from "@/app/common/icons/HomeIcon";
import SearchIcon from "@/app/common/icons/SearchIcon";
import NotificationIcon from "@/app/common/icons/NotificationIcon";
import MessagesIcon from "@/app/common/icons/MessagesIcon";
import GrokIcon from "@/app/common/icons/GrokIcon";
import FavoritedIcon from "@/app/common/icons/FavoritedIcon";
import CommunitiesIcon from "@/app/common/icons/CommunitiesIcon";
import PremiumIcon from "@/app/common/icons/PremiumIcon";
import VerifiedOrgs from "@/app/common/icons/VerifiedOrgs";
import ProfileIcon from "@/app/common/icons/ProfileIcon";
import MoreIcon from "@/app/common/icons/MoreIcon";
import Image from "next/image";
import NavBarPost from "../NavBarPost/NavBarPost";
import { usePathname } from "next/navigation";

function NavBar() {
  const { name, email, username, setCurrentUser } = useCurrentUser();
  const profilePicture = useUserProfile((state) => state.profilePicture);
  const setProfilePicture = useUserProfile((state) => state.setProfilePicture);
  const setNavBarPost = useNavBarPost((state) => state.setNavBarPost);

  function OpenNavBarPost() {
    setNavBarPost(true);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          setCurrentUser({
            name: data.name,
            email: data.email,
            username: data.username,
          });

          setProfilePicture(
            data.profilePicture ||
              "https://i.pinimg.com/736x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg"
          );
        }
      }
    });

    return () => unsubscribe();
  }, [setCurrentUser, setProfilePicture]);

  return (
    <div className="max-w-[380px] w-full h-screen sticky top-0 border-r border-r-[#2F3336] flex flex-col items-start justify-between max-[650px]:items-center pl-[50px] max-[780px]:pl-[5px] pt-[20px] pb-[20px]">
      <div className="flex flex-col gap-[5px]">
        <Link
          href={`/xpage/${username}`}
          className="ml-[9px] w-[30px] h-[30px]"
        >
          <XIcon />
        </Link>

        <Link
          href={`/xpage/${username}`}
          className="flex items-center gap-[10px] hover:bg-[#181818] p-[10px] rounded-[30px]"
        >
          <div className="w-[30px] h-[30px]">
            <HomeIcon />
          </div>
          <h1 className="text-white text-[18px] max-[650px]:hidden">Home</h1>
        </Link>

        <Link
          href={`/explore/${username}`}
          className="flex items-center gap-[10px] hover:bg-[#181818] p-[10px] rounded-[30px]"
        >
          <div className="w-[30px] h-[30px]">
            <SearchIcon />
          </div>
          <h1 className="text-white text-[18px] max-[650px]:hidden">Explore</h1>
        </Link>

        <Link
          href={`/notifications/${username}`}
          className="flex items-center gap-[10px] hover:bg-[#181818] p-[10px] rounded-[30px]"
        >
          <div className="w-[30px] h-[30px]">
            <NotificationIcon />
          </div>
          <h1 className="text-white text-[18px] max-[650px]:hidden">
            Notifications
          </h1>
        </Link>

        <Link
          href={`/messages/${username}`}
          className="flex items-center gap-[10px] hover:bg-[#181818] p-[10px] rounded-[30px]"
        >
          <div className="w-[30px] h-[30px]">
            <MessagesIcon />
          </div>
          <h1 className="text-white text-[18px] max-[650px]:hidden">
            Messages
          </h1>
        </Link>

        <div className="flex items-center gap-[10px] hover:bg-[#181818] p-[10px] rounded-[30px]">
          <div className="w-[30px] h-[30px]">
            <GrokIcon color="white" />
          </div>
          <h1 className="text-white text-[18px] max-[650px]:hidden">Grok</h1>
        </div>

        <Link
          href={`/bookmarks/${username}`}
          className="flex items-center gap-[10px] hover:bg-[#181818] p-[10px] rounded-[30px]"
        >
          <div className="w-[30px] h-[30px]">
            <FavoritedIcon />
          </div>
          <h1 className="text-white text-[18px] max-[650px]:hidden">
            Bookmarks
          </h1>
        </Link>

        <Link
          href={`/communities/${username}`}
          className="flex items-center gap-[10px] hover:bg-[#181818] p-[10px] rounded-[30px]"
        >
          <div className="w-[30px] h-[30px]">
            <CommunitiesIcon />
          </div>
          <h1 className="text-white text-[18px] max-[650px]:hidden">
            Communities
          </h1>
        </Link>

        <div className="flex items-center gap-[10px] hover:bg-[#181818] p-[10px] rounded-[30px]">
          <div className="w-[30px] h-[30px]">
            <PremiumIcon />
          </div>
          <h1 className="text-white text-[18px] max-[650px]:hidden">Premium</h1>
        </div>

        <div className="flex items-center gap-[10px] hover:bg-[#181818] p-[10px] rounded-[30px]">
          <div className="w-[30px] h-[30px]">
            <VerifiedOrgs />
          </div>
          <h1 className="text-white text-[18px] max-[650px]:hidden">
            Verified Orgs
          </h1>
        </div>

        <Link
          href={`/profile/${username}`}
          className="flex items-center gap-[10px] hover:bg-[#181818] p-[10px] rounded-[30px]"
        >
          <div className="w-[30px] h-[30px]">
            <ProfileIcon />
          </div>
          <h1 className="text-white text-[18px] max-[650px]:hidden">Profile</h1>
        </Link>

        <div className="flex items-center gap-[10px] hover:bg-[#181818] p-[10px] rounded-[30px]">
          <div className="w-[30px] h-[30px]">
            <MoreIcon />
          </div>
          <h1 className="text-white text-[18px] max-[650px]:hidden">More</h1>
        </div>

        <button
          onClick={OpenNavBarPost}
          className="w-[200px] rounded-[15px] h-[50px] bg-white flex justify-center items-center font-semibold max-[780px]:hidden"
        >
          Post
        </button>
        <NavBarPost />
      </div>

      <div className="flex gap-[20px] max-[650px]:gap-[0px]">
        <div className="h-[50px] rounded-[50px]  w-[50px] ">
          <Image
            src={profilePicture}
            alt="Profile"
            className="w-full h-full object-cover rounded-[50px]"
            width={500}
            height={500}
          />
        </div>
        <div className="flex flex-col">
          <h3 className="text-white max-[650px]:hidden">{name || "..."}</h3>
          <h3 className="text-[#71767B] max-[780px]:hidden">
            @{email || "..."}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
