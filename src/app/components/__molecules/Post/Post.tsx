"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { PostContextType } from "@/app/common/Types/Common";
import Image from "next/image";

function Post() {
  const [posts, setPosts] = useState<PostContextType[]>([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const postsArray: PostContextType[] = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const postData = doc.data();

          const usersRef = collection(db, "users");
          const usersSnapshot = await getDocs(usersRef);

          let userName = "";
          usersSnapshot.forEach((userDoc) => {
            if (userDoc.data().email === postData.authorEmail) {
              userName = userDoc.data().name;
            }
          });

          return {
            id: doc.id,
            text: postData.text,
            imageUrl: postData.imageUrl,
            authorEmail: postData.authorEmail,
            name: userName,
          };
        })
      );

      setPosts(postsArray);
    });

    return () => unsubscribe();
  }, []);
  return (
    <>
      <div className="flex flex-col gap-[15px] p-[15px]">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border border-[gray] p-[15px] rounded-lg"
          >
            <p className="text-white">{post.text}</p>
            {post.imageUrl && (
              <Image
                height={700}
                width={700}
                src={post.imageUrl}
                alt="Post Image"
                className="mt-[10px] w-[300px] h-[300px] max-w-full rounded-lg"
              />
            )}
            <p className="text-gray-400 text-[15px] mt-[10px]">
              {post.authorEmail}
            </p>
            <p className="text-gray-400 text-[15px] mt-[10px]">{post.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Post;
