import { ParamsType } from "@/app/common/Types/Common";
import FullProfilePage from "@/app/components/__organisms/FullProfilePage/FullProfilePage";
import React from "react";

export const metadata = {
  title: "Profile / X",
  description: "Profile page",
};

function Profile({ params }: ParamsType) {
  const pathName = params.id;

  return (
    <>
      <FullProfilePage pathName={pathName} />
    </>
  );
}

export default Profile;
