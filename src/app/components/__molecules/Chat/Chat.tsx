"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  useMessageInputStore,
  useSelectedUser,
  useUserProfile,
} from "@/app/common/hooks/Store";
import AddPost from "../AddPost/AddPost";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "@/app/firebase/config";
import Image from "next/image";
type ChatMessage = {
  sender: string;
  receiver: string;
  text: string;
  imageUrl: string | null;
  createdAt: Timestamp;
};

function Chat() {
  const selectedUser = useSelectedUser((state) => state.selectedUser);
  const setSelectedUser = useSelectedUser((state) => state.setSelectedUser);
  const profilePicture = useUserProfile((state) => state.profilePicture);
  const text = useMessageInputStore((state) => state.text);
  const image = useMessageInputStore((state) => state.image);
  const file = useMessageInputStore((state) => state.file);
  const setText = useMessageInputStore((state) => state.setText);
  const setImage = useMessageInputStore((state) => state.setImage);
  const setFile = useMessageInputStore((state) => state.setFile);
  const reset = useMessageInputStore((state) => state.reset);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectedUser || !auth.currentUser) return;

    const chatId = [auth.currentUser.email, selectedUser.email]
      .sort()
      .join("_");
    const messagesRef = collection(db, "chats", chatId, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => doc.data() as ChatMessage);
      setMessages(msgs);

      setTimeout(() => {
        chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });

    return () => unsubscribe();
  }, [selectedUser]);

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentUser = auth.currentUser;
    if (!currentUser || !selectedUser) return;
    if (!text && !image) return;

    try {
      reset();

      const chatId = [currentUser.email, selectedUser.email].sort().join("_");

      await addDoc(collection(db, "chats", chatId, "messages"), {
        sender: currentUser.email,
        receiver: selectedUser.email,
        text: text || "",
        imageUrl: image || null,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (!selectedUser) return null;

  return (
    <div className="text-white min-w-[200px] flex flex-col h-screen">
      <div className="flex pt-[16px] border-b border-b-[gray] pb-[10px] pl-[16px] pr-[16px] items-center gap-4 mb-4">
        <button onClick={() => setSelectedUser(null)}>← Back</button>
        <h1 className="text-xl font-bold">Chat with {selectedUser.name}</h1>
      </div>

      <div className="flex-1 bg-[black] p-4 rounded flex flex-col justify-between overflow-y-auto">
        <div className="flex flex-col gap-3">
          {messages.map((msg, key) => {
            const isMine = msg.sender === auth.currentUser?.email;
            const avatar = isMine
              ? profilePicture
              : selectedUser.profilePicture;

            return (
              <div
                key={key}
                className={`flex items-start gap-2 ${
                  isMine ? "justify-end" : "justify-start"
                }`}
              >
                {!isMine && (
                  <Image
                    src={avatar}
                    alt="avatar"
                    width={30}
                    height={30}
                    className="rounded-full w-[30px] h-[30px]"
                  />
                )}

                <div
                  className={`max-w-[70%] p-3 rounded-xl ${
                    isMine
                      ? "bg-[#1d9bf0] text-white"
                      : "bg-[#2f3336] text-white"
                  }`}
                >
                  {msg.text && <p className="break-words">{msg.text}</p>}
                  {msg.imageUrl && (
                    <Image
                      src={msg.imageUrl}
                      alt="image"
                      width={300}
                      height={300}
                      className="rounded mt-2"
                    />
                  )}
                </div>

                {isMine && (
                  <Image
                    src={avatar}
                    alt="avatar"
                    width={30}
                    height={30}
                    className="rounded-full w-[30px] h-[30px]"
                  />
                )}
              </div>
            );
          })}
          <div ref={chatBottomRef}></div>
        </div>

        <div className="ml-[-20px] mr-[-10px]">
          <AddPost
            onSubmit={handleSend}
            placeholder="Send a message"
            text={text}
            setText={setText}
            image={image}
            setImage={setImage}
            setFile={setFile}
            file={file}
            profilePicture={profilePicture}
            btnText="Send"
            hidden="hidden"
            inputId="chat-image"
            border="border-b-[transparent] border-t-[#2F3336] border-t "
          />
        </div>
      </div>
    </div>
  );
}

export default Chat;
