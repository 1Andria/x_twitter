"use client";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from "firebase/firestore";
import { useThemeColors, useUserStore } from "@/app/common/hooks/Store";
import { User } from "@/app/common/Types/Common";
import { auth, db } from "../../../firebase/config";
import Image from "next/image";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
type SuggestProps = {
  hidden?: string;
};

function SuggestFollowers({ hidden }: SuggestProps) {
  const users = useUserStore((state) => state.users);
  const setUsers = useUserStore((state) => state.setUsers);
  const [followedUsers, setFollowedUsers] = useState<string[]>([]);
  const contentColor = useThemeColors((state) => state.contentColor);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, "users");
        const usersSnapshot = await getDocs(usersRef);

        const usersArray: User[] = usersSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            email: data.email,
            username: data.username,
            profilePicture:
              data.profilePicture ||
              "https://i.pinimg.com/736x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg",
          };
        });

        setUsers(usersArray);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, [setUsers]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const currentUserRef = doc(db, "users", user.uid);

        const unsubscribeSnap = onSnapshot(currentUserRef, (docSnap) => {
          const data = docSnap.data();
          setFollowedUsers(data?.followings || []);
        });

        return () => unsubscribeSnap();
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const handleFollow = async (targetUser: User) => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const currentUserRef = doc(db, "users", currentUser.uid);
    const targetUserRef = doc(db, "users", targetUser.id);

    try {
      const isAlreadyFollowing = followedUsers.includes(targetUser.email);

      if (isAlreadyFollowing) {
        await updateDoc(currentUserRef, {
          followings: arrayRemove(targetUser.email),
        });
        await updateDoc(targetUserRef, {
          followers: arrayRemove(currentUser.email),
        });
        setFollowedUsers((prev) =>
          prev.filter((email) => email !== targetUser.email)
        );
      } else {
        await updateDoc(currentUserRef, {
          followings: arrayUnion(targetUser.email),
        });
        await updateDoc(targetUserRef, {
          followers: arrayUnion(currentUser.email),
        });
        setFollowedUsers((prev) => [...prev, targetUser.email]);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <>
        <h1
          className={`${
            contentColor === "white" ? "text-black" : "text-white"
          } font-bold text-[20px] mt-[20px] ml-[10px] mb-[10px]`}
        >
          Suggested for you:
        </h1>
        {users
          .filter((user) => user.email !== auth.currentUser?.email)
          .map((user) => {
            const isFollowing = followedUsers.includes(user.email);

            return (
              <div
                key={user.id}
                className="w-full h-[100px] pl-[15px] pr-[15px] gap-[10px] items-center flex justify-between "
              >
                <Link
                  href={`/profile/${user.username}`}
                  className="flex items-center gap-[10px]"
                >
                  <div className="w-[50px] h-[50px] rounded-[50px] overflow-hidden">
                    <Image
                      src={user.profilePicture}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-[50px]"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div>
                    <h1
                      className={`${
                        contentColor === "white" ? "text-black" : "text-white"
                      }`}
                    >
                      {user.name}
                    </h1>
                    <h1
                      className={`text-[#71767B] max-[550px]:hidden ${hidden}`}
                    >
                      {user.email}
                    </h1>
                  </div>
                </Link>

                <button
                  onClick={() => handleFollow(user)}
                  className={`pr-[15px] pl-[15px] max-[400px]:pl-[10px] max-[400px]:pr-[10px] pt-[5px] pb-[5px] max-[400px]:text-[12px] font-semibold rounded-[30px] transition-all border-black border  ${
                    isFollowing
                      ? "bg-[#0F1419] text-white border border-white"
                      : "bg-white text-black"
                  }`}
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
              </div>
            );
          })}
      </>
    </>
  );
}

export default SuggestFollowers;
