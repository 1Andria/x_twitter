import CryptoIcon from "@/app/common/icons/CryptoIcon";
import WeatherIcon from "@/app/common/icons/WeatherIcon";
import Link from "next/link";
import React from "react";
import WorldIcon from "../../../common/icons/WorldIcon.png";
import Image from "next/image";
function SideSectionExplore() {
  return (
    <>
      <div className="w-full h-[500px] pl-[15px] pt-[20px] border border-[#2F3336] rounded-[20px] mt-[10px] flex flex-col gap-[20px]">
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
          <h2 className="text-[white] font-bold text-[20px]">Crypto world</h2>
        </Link>
        <Link
          href={"https://countries-jade-tau.vercel.app/"}
          target="_blank"
          className="flex gap-[10px] items-center"
        >
          <div className="w-[40px] h-[40px] bg-white rounded-[100%] ">
            <Image src={WorldIcon} height={40} width={40} alt="world" />
          </div>
          <h2 className="text-[white] font-bold text-[20px]">
            Around the world
          </h2>
        </Link>
      </div>
    </>
  );
}

export default SideSectionExplore;
