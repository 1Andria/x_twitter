import SolarSystemIcon from "@/app/common/icons/SolarSystemIcon";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import WorldIcon from "../../../common/icons/WorldIcon.png";
import WeatherIcon from "@/app/common/icons/WeatherIcon";
import CryptoIcon from "@/app/common/icons/CryptoIcon";
import GithubIcon from "@/app/common/icons/GithubIcon";
import MovieIcon from "@/app/common/icons/MovieIcon";
import JobIcon from "@/app/common/icons/JobIcon";

function ExploreLinks() {
  return (
    <>
      <Link
        href={"https://lecture-14-hw-planets.vercel.app/planets/Earth"}
        target="_blank"
        className="flex gap-[10px] items-center"
      >
        <div className="w-[40px] h-[40px] bg-[#1A8CD8] rounded-[100%] ">
          <SolarSystemIcon />
        </div>
        <h2 className="text-[white] font-bold text-[20px]">The solar system</h2>
      </Link>
      <Link
        href={"https://countries-jade-tau.vercel.app/"}
        target="_blank"
        className="flex gap-[10px] items-center"
      >
        <div className="w-[40px] h-[40px] bg-[#1A8CD8] rounded-[100%] ">
          <Image src={WorldIcon} height={40} width={40} alt="world" />
        </div>
        <h2 className="text-[white] font-bold text-[20px]">The world</h2>
      </Link>
      <Link
        href={"https://weather-9q91.vercel.app/"}
        className="flex gap-[10px] items-center"
        target="_blank"
      >
        <div className="w-[40px] h-[40px] ">
          <WeatherIcon />
        </div>
        <h2 className="text-[white] font-bold text-[20px]">Weather</h2>
      </Link>
      <Link
        href={"https://crypto-curr-next-usol.vercel.app/"}
        target="_blank"
        className="flex gap-[10px] items-center"
      >
        <div className="w-[40px] h-[40px] ">
          <CryptoIcon />
        </div>
        <h2 className="text-[white] font-bold text-[20px]">The crypto world</h2>
      </Link>

      <Link
        href={"https://midterm-4-coral.vercel.app/"}
        target="_blank"
        className="flex gap-[10px] items-center"
      >
        <div className="w-[40px] h-[40px] bg-[#1A8CD8] rounded-[100%] ">
          <GithubIcon />
        </div>
        <h2 className="text-[white] font-bold text-[20px]">GitHub</h2>
      </Link>

      <Link
        href={"https://midterm-3-react.vercel.app/"}
        target="_blank"
        className="flex gap-[10px] items-center"
      >
        <div className="w-[40px] h-[40px] bg-[#1A8CD8] flex justify-center items-center rounded-[100%] ">
          <MovieIcon />
        </div>
        <h2 className="text-[white] font-bold text-[20px]">Movies</h2>
      </Link>
      <Link
        href={"https://react-21-job-listings.vercel.app/"}
        target="_blank"
        className="flex gap-[10px] items-center"
      >
        <div className="w-[40px] h-[40px] bg-[#1A8CD8] flex justify-center items-center rounded-[100%] ">
          <JobIcon />
        </div>
        <h2 className="text-[white] font-bold text-[20px]">Jobs</h2>
      </Link>
    </>
  );
}

export default ExploreLinks;
