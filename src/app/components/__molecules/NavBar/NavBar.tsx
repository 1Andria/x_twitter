import CommunitiesIcon from "@/app/common/icons/CommunitiesIcon";
import FavoritedIcon from "@/app/common/icons/FavoritedIcon";
import GrokIcon from "@/app/common/icons/GrokIcon";
import HomeIcon from "@/app/common/icons/HomeIcon";
import MessagesIcon from "@/app/common/icons/MessagesIcon";
import MoreIcon from "@/app/common/icons/MoreIcon";
import NotificationIcon from "@/app/common/icons/NotificationIcon";
import PremiumIcon from "@/app/common/icons/PremiumIcon";
import ProfileIcon from "@/app/common/icons/ProfileIcon";
import SearchIcon from "@/app/common/icons/SearchIcon";
import VerifiedOrgs from "@/app/common/icons/VerifiedOrgs";
import XIcon from "@/app/common/icons/xIcon";
import Link from "next/link";
import React from "react";
// import SwitchMode from "../../__atoms/SwitchMode/SwitchMode";

type NavBar = {
  pathName: string;
};

function NavBar({ pathName }: NavBar) {
  return (
    <div className="max-w-[320px] w-full h-full fixed border-r border-r-[#2F3336] flex flex-col items-start justify-between pl-[50px] pt-[20px] pb-[20px] ">
      <div className="flex flex-col gap-[20px]">
        {/* <SwitchMode /> */}
        <div className="w-[30px] h-[30px] ">
          <XIcon />
        </div>
        <Link
          href={`/xpage/${pathName}`}
          className="w-auto gap-[10px] flex items-center "
        >
          <div className="w-[30px] h-[30px]">
            <HomeIcon />
          </div>
          <h1 className="text-white text-[18px]">Home</h1>
        </Link>
        <Link
          href={`/explore/${pathName}`}
          className="w-auto gap-[10px] flex items-center "
        >
          <div className="w-[30px] h-[30px] ">
            <SearchIcon />
          </div>
          <h1 className="text-white text-[18px]">Explore</h1>
        </Link>
        <Link
          href={`/notifications/${pathName}`}
          className="w-auto gap-[10px] flex items-center "
        >
          <div className="w-[30px] h-[30px] ">
            <NotificationIcon />
          </div>
          <h1 className="text-white text-[18px]">Notifications</h1>
        </Link>
        <Link
          href={`/messages/${pathName}`}
          className="w-auto gap-[10px] flex items-center "
        >
          <div className="w-[30px] h-[30px] text-[18px]">
            <MessagesIcon />
          </div>
          <h1 className="text-white text-[18px]">Messages</h1>
        </Link>
        <div className="w-auto gap-[10px] flex items-center ">
          <div className="w-[30px] h-[30px] text-[18px]">
            <GrokIcon />
          </div>
          <h1 className="text-white text-[18px]">Grok</h1>
        </div>
        <Link
          href={`/bookmarks/${pathName}`}
          className="w-auto gap-[10px] flex items-center "
        >
          <div className="w-[30px] h-[30px] text-[18px]">
            <FavoritedIcon />
          </div>
          <h1 className="text-white text-[18px]">BookMarks</h1>
        </Link>
        <Link
          href={`/communities/${pathName}`}
          className="w-auto gap-[10px] flex items-center "
        >
          <div className="w-[30px] h-[30px] text-[18px]">
            <CommunitiesIcon />
          </div>
          <h1 className="text-white text-[18px]">Communities</h1>
        </Link>
        <div className="w-auto gap-[10px] flex items-center ">
          <div className="w-[30px] h-[30px] text-[18px]">
            <PremiumIcon />
          </div>
          <h1 className="text-white text-[18px]">Premium</h1>
        </div>
        <div className="w-auto gap-[10px] flex items-center ">
          <div className="w-[30px] h-[30px] text-[18px]">
            <VerifiedOrgs />
          </div>
          <h1 className="text-white text-[18px]">Verified orgs</h1>
        </div>
        <Link
          href={`/profile/${pathName}`}
          className="w-auto gap-[10px] flex items-center "
        >
          <div className="w-[30px] h-[30px] text-[18px]">
            <ProfileIcon />
          </div>
          <h1 className="text-white text-[18px]">Profile</h1>
        </Link>
        <div className="w-auto gap-[10px] flex items-center ">
          <div className="w-[30px] h-[30px] text-[18px]">
            <MoreIcon />
          </div>
          <h1 className="text-white text-[18px]">More</h1>
        </div>
        <button className="w-[200px] rounded-[15px] h-[50px] bg-white flex justify-center items-center font-semibold  ">
          Post
        </button>
      </div>
      <div className="flex gap-[20px]">
        <div className="h-[50px] rounded-[50px] w-[50px] bg-[green]"></div>
        <div className="flex flex-col">
          <h3 className="text-white">{pathName}</h3>
          <h3 className="text-white">@{pathName}</h3>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
