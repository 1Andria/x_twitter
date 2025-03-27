"use client";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useUserStore } from "@/app/common/hooks/Store";
import { User } from "@/app/common/Types/Common";
import { auth, db } from "../../../firebase/config";

function SuggestFollowers() {
  const users = useUserStore((state) => state.users);
  const setUsers = useUserStore((state) => state.setUsers);
  const [followedUsers, setFollowedUsers] = useState<string[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, "users");
        const usersSnapshot = await getDocs(usersRef);

        const usersArray: User[] = usersSnapshot.docs.map((doc) => {
          const data = doc.data() as { name: string; email: string };
          return {
            id: doc.id,
            name: data.name,
            email: data.email,
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
    const fetchFollowings = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      try {
        const currentUserRef = doc(db, "users", currentUser.uid);
        const currentSnap = await getDoc(currentUserRef);
        const currentData = currentSnap.data();

        if (currentData?.followings) {
          setFollowedUsers(currentData.followings);
        } else {
          setFollowedUsers([]);
        }
      } catch (err) {
        console.error("Error fetching followings: ", err);
      }
    };

    fetchFollowings();
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
      <h1 className="text-white font-bold text-[20px] mt-[20px] ml-[10px] mb-[10px]">
        Suggested for you:
      </h1>
      {users
        .filter((user) => user.email !== auth.currentUser?.email)
        .map((user) => {
          const isFollowing = followedUsers.includes(user.email);

          return (
            <div
              key={user.id}
              className="w-full h-[100px] pl-[15px] pr-[15px] items-center flex justify-between "
            >
              <div className="flex items-center gap-[10px]">
                <div className="w-[50px] h-[50px] rounded-[50px] bg-[green]"></div>
                <div>
                  <h1 className="text-white">{user.name}</h1>
                  <h1 className="text-[#71767B]">{user.email}</h1>
                </div>
              </div>
              <button
                onClick={() => handleFollow(user)}
                className={`pr-[15px] pl-[15px] pt-[5px] pb-[5px] font-semibold rounded-[30px] transition-all duration-200 ${
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
  );
}

export default SuggestFollowers;
