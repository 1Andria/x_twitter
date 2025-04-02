"use client";
import React, { useEffect, useState } from "react";
import { db, auth } from "@/app/firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import Image from "next/image";
import { onAuthStateChanged } from "firebase/auth";

type Notification = {
  username: string;
  name: string;
  profilePicture: string;
  message: string;
};

function NotificationContext() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentEmail, setCurrentEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.email) {
        setCurrentEmail(user.email);

        const followersQuery = query(
          collection(db, "users"),
          where("followings", "array-contains", user.email)
        );
        const followersSnapshot = await getDocs(followersQuery);

        const followersData: Notification[] = followersSnapshot.docs.map(
          (doc) => {
            const data = doc.data();
            return {
              username: data.username,
              name: data.name,
              profilePicture: data.profilePicture,
              message: "started following you",
            };
          }
        );

        const postsQuery = query(
          collection(db, "posts"),
          where("authorEmail", "==", user.email)
        );
        const postsSnapshot = await getDocs(postsQuery);

        let likerEmails: string[] = [];

        postsSnapshot.docs.forEach((doc) => {
          const data = doc.data();
          if (Array.isArray(data.likes)) {
            likerEmails.push(...data.likes);
          }
        });

        const filteredEmails = likerEmails.filter(
          (email) => email !== user.email
        );

        let likeNotifs: Notification[] = [];

        for (const email of filteredEmails) {
          const usersRef = collection(db, "users");
          const userQuery = query(usersRef, where("email", "==", email));
          const userSnapshot = await getDocs(userQuery);

          userSnapshot.forEach((doc) => {
            const data = doc.data();
            likeNotifs.push({
              username: data.username,
              name: data.name,
              profilePicture: data.profilePicture,
              message: "liked your post",
            });
          });
        }
        setNotifications([...followersData, ...likeNotifs]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <h1 className="text-white font-semibold ml-[16px] text-[30px] mt-[15px]">
        Notifications:
      </h1>
      <div className="flex flex-col gap-[16px] p-[16px]">
        {notifications.map((user, key) => (
          <div
            key={key}
            className="flex items-center gap-[12px] border-[1px] border-[#536471] p-[16px] rounded-xl"
          >
            <div className="w-[45px] h-[45px] rounded-full overflow-hidden">
              <Image
                src={user.profilePicture}
                alt={user.name}
                width={100}
                height={100}
                className="object-cover"
              />
            </div>
            <div className="text-white">
              <h1>
                {user.name}
                <span className="text-[#71767B] ml-[10px]">{user.message}</span>
              </h1>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default NotificationContext;
