"use client";
import React, { useEffect, useRef, useState } from "react";
import { PostContextType, PropsType } from "@/app/common/Types/Common";
import { auth, db } from "@/app/firebase/config";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import Image from "next/image";
import TextareaAutosize from "react-textarea-autosize";
import Link from "next/link";
import CommentIcon from "@/app/common/icons/CommentIcon";
import ShareIcon from "@/app/common/icons/ShareIcon";
import StatisticIcon from "@/app/common/icons/StatisticIcon";
import DownoloadIcon from "@/app/common/icons/DownoloadIcon";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import ReactTimeAgo from "react-time-ago";
import { useHoverStore, useMoreInfo } from "@/app/common/hooks/Store";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import Delete from "@/app/common/icons/Delete";
import ReportIcon from "@/app/common/icons/ReportIcon";
import EditIcon from "@/app/common/icons/EditIcon";
import Unsmile from "@/app/common/icons/Unsmile";
TimeAgo.addDefaultLocale(en);

type Props = {
  post: PostContextType;
};

const PostItem = ({ post }: Props) => {
  const currentUserEmail = auth.currentUser?.email;
  const moreColor = useHoverStore((state) => state.moreColor);
  const setMoreColor = useHoverStore((state) => state.setMoreColor);
  const moreDiv = useMoreInfo((state) => state.moreDiv);
  const setMoreDiv = useMoreInfo((state) => state.setMoreDiv);

  const [currentUsername, setCurrentUsername] = useState<string>("");

  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState(post.text);

  const divRef = useRef<HTMLDivElement | null>(null);
  const EditDivRef = useRef<HTMLDivElement | null>(null);

  const handleLike = async () => {
    if (!currentUserEmail) return;
    const ref = doc(db, "posts", post.id);
    const isLiked = post.likes.includes(currentUserEmail);
    await updateDoc(ref, {
      likes: isLiked
        ? arrayRemove(currentUserEmail)
        : arrayUnion(currentUserEmail),
    });
  };

  const handleBookmark = async () => {
    if (!currentUserEmail) return;
    const ref = doc(db, "posts", post.id);
    const isBookmarked = post.bookmarks.includes(currentUserEmail);
    await updateDoc(ref, {
      bookmarks: isBookmarked
        ? arrayRemove(currentUserEmail)
        : arrayUnion(currentUserEmail),
    });
  };

  function ShowMoreDiv() {
    setMoreDiv(moreDiv === post.id ? null : post.id);
  }

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        moreDiv === post.id &&
        divRef.current &&
        !divRef.current.contains(event.target as Node)
      ) {
        setMoreDiv(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [moreDiv, post.id]);

  useEffect(() => {
    const handleOutsideEditClick = (event: MouseEvent) => {
      if (
        edit &&
        EditDivRef.current &&
        !EditDivRef.current.contains(event.target as Node)
      ) {
        setEdit(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideEditClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideEditClick);
    };
  }, [edit]);

  useEffect(() => {
    const fetchCurrentUsername = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setCurrentUsername(userSnap.data().username);
        }
      }
    };

    fetchCurrentUsername();
  }, []);
  const DeletePost = async () => {
    const ref = doc(db, "posts", post.id);
    await deleteDoc(ref);
    setMoreDiv(null);
  };
  const TextAreaRef = useRef<HTMLTextAreaElement | null>(null);

  function EditTxt() {
    setEdit(true);
    setMoreDiv(moreDiv === post.id ? null : post.id);

    setTimeout(() => {
      if (TextAreaRef.current) {
        TextAreaRef.current.focus();
      }
    }, 100);
  }

  const handleSaveEdit = async () => {
    const ref = doc(db, "posts", post.id);
    await updateDoc(ref, {
      text: editText,
    });
    setEdit(false);
  };

  return (
    <div className="border border-[#2F3336] p-[15px] flex gap-[8px]">
      <Link
        href={`/profile/${post.username}`}
        className="w-[40px] h-[40px] rounded-[50px] overflow-hidden flex-shrink-0"
      >
        <Image
          src={post.profilePicture}
          alt="Profile"
          className="w-full h-full object-cover rounded-[50px]"
          width={500}
          height={500}
        />
      </Link>

      <div className="flex flex-col items-start w-full min-w-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-[8px]">
            <Link href={`/profile/${post.username}`}>
              <h3 className="text-white font-bold hover:underline">
                {post.name}
              </h3>
            </Link>
            <h3 className="text-[#71767B] text-[14px] font-semibold">
              @{post.authorEmail.split("@")[0]}
            </h3>
            <div className="w-[3px] h-[3px] rounded-full bg-[#71767B]"></div>
            <h3 className="text-[#71767B] text-[14px] font-semibold">
              {post.createdAt && (
                <ReactTimeAgo date={post.createdAt.toDate()} locale="en-US" />
              )}
            </h3>
          </div>

          <div className="relative">
            {moreDiv === post.id && (
              <div ref={divRef} className="absolute right-0  z-50">
                <div className="pt-[10px] pb-[10px] w-[170px] pl-[10px] pr-[10px] flex flex-col bg-black border border-white/20 shadow-white shadow-sm rounded-[10px] gap-[20px]">
                  {currentUsername != post.username && (
                    <button onClick={ShowMoreDiv} className="flex gap-[10px]">
                      <div className="w-[25px] h-[25px]">
                        <ReportIcon />
                      </div>
                      <h3 className="text-white">Report</h3>
                    </button>
                  )}
                  {currentUsername != post.username && (
                    <button onClick={ShowMoreDiv} className="flex gap-[10px]">
                      <div className="w-[25px] h-[25px]">
                        <Unsmile />
                      </div>
                      <h3 className="text-white">Not interested</h3>
                    </button>
                  )}
                  {currentUsername === post.username && (
                    <button onClick={EditTxt} className="flex gap-[10px]">
                      <div className="w-[25px] h-[25px]">
                        <EditIcon />
                      </div>
                      <h3 className="text-white">Edit text</h3>
                    </button>
                  )}
                  {currentUsername === post.username && (
                    <button onClick={DeletePost} className="flex gap-[10px]">
                      <div className="w-[25px] h-[25px]">
                        <Delete />
                      </div>
                      <h3 className="text-[red]">Delete post</h3>
                    </button>
                  )}
                </div>
              </div>
            )}
            <div
              onMouseEnter={() => setMoreColor(post.id)}
              onMouseLeave={() => setMoreColor(null)}
              className="flex gap-[2px] cursor-pointer pt-[15px] pb-[15px] pl-[10px] pr-[10px] rounded-full hover:bg-[#0A171F]"
              onClick={ShowMoreDiv}
            >
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`w-[3px] h-[3px] rounded-full ${
                    moreColor === post.id ? "bg-[#1D9BF0]" : "bg-[#71767B]"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {!edit && (
          <div className="w-full max-w-full break-words">
            <p className="text-white break-words whitespace-pre-wrap">
              {post.text}
            </p>
          </div>
        )}

        {edit && (
          <div
            ref={EditDivRef}
            className="flex w-full gap-[20px]  justify-between "
          >
            <TextareaAutosize
              ref={TextAreaRef}
              className="text-white w-full resize-none bg-transparent"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <button
              onClick={handleSaveEdit}
              className="bg-black h-[40px] border border-[1px]-white rounded-[10px] font-semibold pr-[10px] pl-[10px] text-white"
            >
              Edit
            </button>
          </div>
        )}

        {post.imageUrl && (
          <div className="w-full pr-[10px] max-h-[500px]">
            <Image
              height={700}
              width={700}
              src={post.imageUrl}
              alt="Post Image"
              className="mt-[10px] w-full h-full max-w-full rounded-[20px]"
            />
          </div>
        )}

        <div className="w-full h-[40px] flex items-center justify-between mt-[25px] pr-[10px]">
          <div className="flex items-center">
            <div className="w-[20px] h-[20px]">
              <CommentIcon />
            </div>
            <h3 className="text-[#6D7176]">2k</h3>
          </div>
          <div className="flex items-center">
            <div className="w-[20px] h-[20px]">
              <ShareIcon />
            </div>
          </div>
          <div className="flex items-center">
            <Checkbox
              checked={post.likes.includes(currentUserEmail || "")}
              onChange={handleLike}
              icon={<FavoriteBorder sx={{ color: "#6D7176" }} />}
              checkedIcon={<Favorite sx={{ color: "red" }} />}
            />
            <h3 className="text-[#6D7176]">{post.likes.length}</h3>
          </div>
          <div className="flex items-center">
            <div className="w-[20px] h-[20px]">
              <StatisticIcon />
            </div>
          </div>
          <div className="flex items-center">
            <Checkbox
              checked={post.bookmarks.includes(currentUserEmail || "")}
              onChange={handleBookmark}
              icon={<BookmarkBorderIcon sx={{ color: "#6D7176" }} />}
              checkedIcon={<BookmarkIcon sx={{ color: "rgb(29, 155, 240)" }} />}
            />
            <div className="w-[20px] h-[20px]">
              <DownoloadIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
