import {
  useCover,
  useEditProfile,
  useThemeColors,
} from "@/app/common/hooks/Store";
import React from "react";

function ProfileBtn() {
  const setEditProfile = useEditProfile((state) => state.setEditProfile);
  const setToCover = useCover((state) => state.setToCover);
  const contentColor = useThemeColors((state) => state.contentColor);

  function ChangeEditProfile() {
    setEditProfile();
    setToCover(false);
  }
  return (
    <>
      <button
        onClick={ChangeEditProfile}
        className={`${contentColor === "white" ? "text-black" : "text-white"} ${
          contentColor === "white"
            ? "hover:bg-[#E7E7E8]"
            : "hover:bg-[#181818] "
        } border-[1px] mr-[15px] mt-[10px] border-[#536471] h-[40px] max-[700px]:text-[12px] max-[700px]:w-[100px] max-[700px]:pr-[5px] max-[700px]:pl-[5px]  pl-[15px] pr-[15px] rounded-[20px]`}
      >
        Set up profile
      </button>
    </>
  );
}

export default ProfileBtn;
