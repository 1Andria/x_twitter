import { useCover, useUserProfile } from "@/app/common/hooks/Store";
import PhotoIcon from "@/app/common/icons/PhotoIcon";
import XIcon from "@/app/common/icons/xIcon";
import { auth, db } from "@/app/firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import React, { ChangeEvent } from "react";

function ProfilePictureUpload() {
  const setToCover = useCover((state) => state.setToCover);
  const setProfilePicture = useUserProfile((state) => state.setProfilePicture);
  const profilePicture = useUserProfile((state) => state.profilePicture);

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
    <>
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
    </>
  );
}

export default ProfilePictureUpload;
