import { useCover, useEditProfile } from "@/app/common/hooks/Store";
import React from "react";

function ProfileBtn() {
  const setEditProfile = useEditProfile((state) => state.setEditProfile);
  const setToCover = useCover((state) => state.setToCover);

  function ChangeEditProfile() {
    setEditProfile();
    setToCover(false);
  }
  return (
    <>
      <button
        onClick={ChangeEditProfile}
        className="text-[white] hover:bg-[#111313] border-[1px] mr-[15px] mt-[10px] border-[#536471] h-[40px] pl-[15px] pr-[15px] rounded-[20px]"
      >
        Set up profile
      </button>
    </>
  );
}

export default ProfileBtn;
