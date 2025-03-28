"use client";
import { useEffect } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { usePostData } from "@/app/common/hooks/Store";
import { PostContextType } from "@/app/common/Types/Common";

export default function PostFetcher() {
  const setPosts = usePostData((state) => state.setPosts);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const usersSnapshot = await getDocs(collection(db, "users"));

      const postsArray: PostContextType[] = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const postData = docSnap.data();
          let userName = "";
          let userProfilePicture = "";
          let username = "";

          usersSnapshot.forEach((userDoc) => {
            const user = userDoc.data();
            if (user.email === postData.authorEmail) {
              userName = user.name;
              userProfilePicture =
                user.profilePicture ||
                "https://i.pinimg.com/736x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg";
              username = user.username || "";
            }
          });

          return {
            id: docSnap.id,
            text: postData.text,
            imageUrl: postData.imageUrl,
            authorEmail: postData.authorEmail,
            name: userName,
            profilePicture: userProfilePicture,
            createdAt: postData.createdAt,
            likes: postData.likes || [],
            bookmarks: postData.bookmarks || [],
            username: username,
          };
        })
      );

      setPosts(postsArray);
    });

    return () => unsubscribe();
  }, [setPosts]);

  return null;
}
