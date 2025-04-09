"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../../firebase/config";
import Image from "next/image";
import { useSelectedUser, useThemeColors } from "@/app/common/hooks/Store";
import Chat from "../Chat/Chat";
import { onAuthStateChanged } from "firebase/auth";

export type SelectedUserType = {
  id: string;
  name: string;
  email: string;
  username: string;
  profilePicture: string;
};

function MessagesContext() {
  const [mutualUsers, setMutualUsers] = useState<SelectedUserType[]>([]);
  const selectedUser = useSelectedUser((state) => state.selectedUser);
  const setSelectedUser = useSelectedUser((state) => state.setSelectedUser);
  const contentColor = useThemeColors((state) => state.contentColor);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) return;
      const currentUserRef = doc(db, "users", user.uid);
      const unsubscribeSnapshot = onSnapshot(
        currentUserRef,
        async (docSnap) => {
          const currentData = docSnap.data();
          const followings: string[] = currentData?.followings || [];
          const followers: string[] = currentData?.followers || [];
          const mutualEmails = followings.filter((email) =>
            followers.includes(email)
          );
          const usersSnapshot = await getDocs(collection(db, "users"));
          const mutuals: SelectedUserType[] = [];
          usersSnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            if (mutualEmails.includes(data.email)) {
              mutuals.push({
                id: docSnap.id,
                name: data.name,
                email: data.email,
                username: data.username,
                profilePicture: data.profilePicture,
              });
            }
          });

          setMutualUsers(mutuals);
        }
      );
      return () => unsubscribeSnapshot();
    });
    return () => unsubscribeAuth();
  }, []);

  return (
    <div className="max-w-[650px] min-w-[300px] mr-[10px] pr-[10px] w-full min-h-screen h-auto border-r border-r-[#2F3336] flex flex-col">
      {!selectedUser && (
        <div className="w-full h-[70px] border-b border-b-[#2F3336] flex items-center pl-[20px]">
          <h1
            className={`${
              contentColor === "white" ? "text-black" : "text-white"
            } text-[20px] font-bold`}
          >
            Messages
          </h1>
        </div>
      )}

      {!selectedUser && (
        <div className="p-[16px]  flex flex-col gap-[16px]">
          {mutualUsers.length === 0 && (
            <div className="w-full flex justify-center pt-[40px]">
              <h1 className="text-[gray] text-[20px]">
                You do not have friends yet
              </h1>
            </div>
          )}
          {mutualUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={`flex cursor-pointer items-center gap-[12px] p-[8px] ${
                contentColor === "white"
                  ? "hover:bg-[#E7E7E8]"
                  : "hover:bg-[#181818] "
              } rounded-lg transition`}
            >
              <Image
                src={user.profilePicture}
                alt={user.name}
                className="w-[40px] h-[40px] object-cover rounded-full"
                width={40}
                height={40}
              />
              <span
                className={` ${
                  contentColor === "white" ? "text-black" : "text-white"
                } font-medium`}
              >
                {user.name}
              </span>
            </div>
          ))}
        </div>
      )}

      {selectedUser && <Chat />}
    </div>
  );
}

export default MessagesContext;
