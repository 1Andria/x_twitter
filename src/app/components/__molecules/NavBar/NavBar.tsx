"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/app/firebase/config";
import { useCurrentUser } from "@/app/common/hooks/Store";
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

function NavBar() {
  const { name, email, username, setCurrentUser } = useCurrentUser();

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
        }
      }
    });

    return () => unsubscribe();
  }, [setCurrentUser]);

  return (
    <div className="max-w-[380px] w-full h-screen sticky top-0 border-r border-r-[#2F3336] flex flex-col items-start justify-between pl-[50px] pt-[20px] pb-[20px]">
      <div className="flex flex-col gap-[20px]">
        <div className="w-[30px] h-[30px]">
          <XIcon />
        </div>

        <Link
          href={`/xpage/${username}`}
          className="flex items-center gap-[10px]"
        >
          <div className="w-[30px] h-[30px]">
            <HomeIcon />
          </div>
          <h1 className="text-white text-[18px]">Home</h1>
        </Link>

        <Link
          href={`/explore/${username}`}
          className="flex items-center gap-[10px]"
        >
          <div className="w-[30px] h-[30px]">
            <SearchIcon />
          </div>
          <h1 className="text-white text-[18px]">Explore</h1>
        </Link>

        <Link
          href={`/notifications/${username}`}
          className="flex items-center gap-[10px]"
        >
          <div className="w-[30px] h-[30px]">
            <NotificationIcon />
          </div>
          <h1 className="text-white text-[18px]">Notifications</h1>
        </Link>

        <Link
          href={`/messages/${username}`}
          className="flex items-center gap-[10px]"
        >
          <div className="w-[30px] h-[30px]">
            <MessagesIcon />
          </div>
          <h1 className="text-white text-[18px]">Messages</h1>
        </Link>

        <div className="flex items-center gap-[10px]">
          <div className="w-[30px] h-[30px]">
            <GrokIcon color="white" />
          </div>
          <h1 className="text-white text-[18px]">Grok</h1>
        </div>

        <Link
          href={`/bookmarks/${username}`}
          className="flex items-center gap-[10px]"
        >
          <div className="w-[30px] h-[30px]">
            <FavoritedIcon />
          </div>
          <h1 className="text-white text-[18px]">Bookmarks</h1>
        </Link>

        <Link
          href={`/communities/${username}`}
          className="flex items-center gap-[10px]"
        >
          <div className="w-[30px] h-[30px]">
            <CommunitiesIcon />
          </div>
          <h1 className="text-white text-[18px]">Communities</h1>
        </Link>

        <div className="flex items-center gap-[10px]">
          <div className="w-[30px] h-[30px]">
            <PremiumIcon />
          </div>
          <h1 className="text-white text-[18px]">Premium</h1>
        </div>

        <div className="flex items-center gap-[10px]">
          <div className="w-[30px] h-[30px]">
            <VerifiedOrgs />
          </div>
          <h1 className="text-white text-[18px]">Verified Orgs</h1>
        </div>

        <Link
          href={`/profile/${username}`}
          className="flex items-center gap-[10px]"
        >
          <div className="w-[30px] h-[30px]">
            <ProfileIcon />
          </div>
          <h1 className="text-white text-[18px]">Profile</h1>
        </Link>

        <div className="flex items-center gap-[10px]">
          <div className="w-[30px] h-[30px]">
            <MoreIcon />
          </div>
          <h1 className="text-white text-[18px]">More</h1>
        </div>

        <button className="w-[200px] rounded-[15px] h-[50px] bg-white flex justify-center items-center font-semibold">
          Post
        </button>
      </div>

      <div className="flex gap-[20px]">
        <div className="h-[50px] rounded-[50px] w-[50px] bg-[green]"></div>
        <div className="flex flex-col">
          <h3 className="text-white">{name || "..."}</h3>
          <h3 className="text-[#71767B]">@{email || "..."}</h3>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
