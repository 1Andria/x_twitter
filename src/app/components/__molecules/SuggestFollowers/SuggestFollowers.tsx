"use client";
import React, { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useUserStore } from "@/app/common/hooks/Store";
import { User } from "@/app/common/Types/Common";

function SuggestFollowers() {
  const users = useUserStore((state) => state.users);
  const setUsers = useUserStore((state) => state.setUsers);

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

  return (
    <>
      <h1 className="text-white font-bold text-[30px] mb-[40px]">
        Suggested for you:
      </h1>
      {users.map((user) => (
        <div
          key={user.id}
          className="w-full h-[100px] pl-[15px] pr-[15px] items-center flex justify-between border border-[#2F3336]"
        >
          <div className="flex items-center gap-[10px]">
            <div className="w-[50px] h-[50px] rounded-[50px] bg-[green]"></div>
            <div>
              <h1 className="text-white">{user.name}</h1>
              <h1 className="text-[gray]">{user.email}</h1>
            </div>
          </div>
          <button className="p-[10px] bg-[blue] text-white rounded">
            Follow
          </button>
        </div>
      ))}
    </>
  );
}

export default SuggestFollowers;
