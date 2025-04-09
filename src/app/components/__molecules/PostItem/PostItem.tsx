"use client";
import React, { useEffect, useRef, useState } from "react";
import { PostItemProps } from "@/app/common/Types/Common";
import { auth, db } from "@/app/firebase/config";
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
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
import {
  useAddComment,
  useCommentModal,
  useHoverStore,
  useMoreInfo,
  useThemeColors,
} from "@/app/common/hooks/Store";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import Delete from "@/app/common/icons/Delete";
import ReportIcon from "@/app/common/icons/ReportIcon";
import EditIcon from "@/app/common/icons/EditIcon";
import Unsmile from "@/app/common/icons/Unsmile";
import AddComment from "../AddComment/AddComment";
import CommentModal from "../CommentModal/CommentModal";
TimeAgo.addDefaultLocale(en);

const PostItem = ({ post }: PostItemProps) => {
  const currentUserEmail = auth.currentUser?.email;
  const moreColor = useHoverStore((state) => state.moreColor);
  const setMoreColor = useHoverStore((state) => state.setMoreColor);
  const moreDiv = useMoreInfo((state) => state.moreDiv);
  const setMoreDiv = useMoreInfo((state) => state.setMoreDiv);
  const [currentUsername, setCurrentUsername] = useState<string>("");
  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState(post.text);
  const setCommentModal = useAddComment((state) => state.setCommentModal);
  const setAllComments = useCommentModal((state) => state.setAllComments);
  const contentColor = useThemeColors((state) => state.contentColor);

  const [commentCount, setCommentCount] = useState<number>(0);

  const divRef = useRef<HTMLDivElement | null>(null);
  const EditDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const commentsRef = collection(db, "posts", post.id, "comments");

    const unsubscribe = onSnapshot(commentsRef, (snapshot) => {
      setCommentCount(snapshot.size);
    });

    return () => unsubscribe();
  }, [post.id]);

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

      <div className="flex flex-col items-start w-full min-w-[200px]">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-[8px] max-[600px]:flex-col">
            <Link href={`/profile/${post.username}`}>
              <h3
                className={`${
                  contentColor === "white" ? "text-black" : "text-white"
                } font-bold hover:underline`}
              >
                {post.name}
              </h3>
            </Link>
            <h3 className="text-[#71767B] max-[600px]:hidden text-[14px] font-semibold">
              @{post.authorEmail.split("@")[0]}
            </h3>
            <div className="w-[3px] h-[3px] rounded-full max-[600px]:hidden bg-[#71767B]"></div>
            <h3 className="text-[#71767B] text-[14px] font-semibold">
              {post.createdAt && (
                <ReactTimeAgo date={post.createdAt.toDate()} locale="en-US" />
              )}
            </h3>
          </div>

          <div className="relative">
            {moreDiv === post.id && (
              <div ref={divRef} className="absolute right-0  z-50">
                <div
                  className={`pt-[10px] pb-[10px] w-[170px] pl-[10px] pr-[10px] flex flex-col bg-[${contentColor}] border ${
                    contentColor === "white"
                      ? "border-[black] border-[1px]"
                      : "border-[white] border-[1px]"
                  }  shadow-white shadow-sm rounded-[10px] gap-[20px]`}
                >
                  {currentUsername != post.username && (
                    <button onClick={ShowMoreDiv} className="flex gap-[10px]">
                      <div className="w-[25px] h-[25px]">
                        <ReportIcon />
                      </div>
                      <h3
                        className={`${
                          contentColor === "white" ? "text-black" : "text-white"
                        } `}
                      >
                        Report
                      </h3>
                    </button>
                  )}
                  {currentUsername != post.username && (
                    <button onClick={ShowMoreDiv} className="flex gap-[10px]">
                      <div className="w-[25px] h-[25px]">
                        <Unsmile />
                      </div>
                      <h3
                        className={`${
                          contentColor === "white" ? "text-black" : "text-white"
                        } `}
                      >
                        Not interested
                      </h3>
                    </button>
                  )}
                  {currentUsername === post.username && (
                    <button onClick={EditTxt} className="flex gap-[10px]">
                      <div className="w-[25px] h-[25px]">
                        <EditIcon />
                      </div>
                      <h3
                        className={`${
                          contentColor === "white" ? "text-black" : "text-white"
                        } `}
                      >
                        Edit text
                      </h3>
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
              className={`flex gap-[2px] cursor-pointer pt-[15px] pb-[15px] pl-[10px] pr-[10px] rounded-full ${
                contentColor === "white"
                  ? "hover:bg-[#E7E7E8]"
                  : "hover:bg-[#181818] "
              }`}
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
          <div
            onClick={() => setAllComments(post.id)}
            className="w-full max-w-full min-w-0 cursor-pointer overflow-hidden"
          >
            <p
              className={`${
                contentColor === "white" ? "text-black" : "text-white"
              } whitespace-pre-wrap break-words break-all`}
            >
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
              className={`${
                contentColor === "white" ? "text-black" : "text-white"
              } w-full resize-none bg-transparent`}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <button
              onClick={handleSaveEdit}
              className={`${
                contentColor === "white" ? "text-black" : "text-white"
              } bg-[${
                contentColor === "white" ? "bg-[black]" : "bg-[white]"
              }}] h-[40px] border border-[1px]-white rounded-[10px] font-semibold pr-[10px] pl-[10px] `}
            >
              Edit
            </button>
          </div>
        )}

        {post.imageUrl && (
          <div
            onClick={() => setAllComments(post.id)}
            className="w-full pr-[10px] max-h-[500px] cursor-pointer"
          >
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
          <div className="flex items-center gap-[5px]">
            <div
              onClick={() => setCommentModal(post.id)}
              className="w-[20px] h-[20px] cursor-pointer"
            >
              <CommentIcon />
            </div>
            <h3 className="text-[#6D7176]">{commentCount}</h3>
          </div>
          <div className="flex items-center max-[600px]:hidden">
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
            <div className="w-[20px] h-[20px] max-[600px]:hidden">
              <DownoloadIcon />
            </div>
          </div>
        </div>
      </div>
      <AddComment
        postProfilePicture={post.profilePicture}
        postId={post.id}
        postAuthorName={post.name}
        postAuthorEmail={post.authorEmail}
        postCreatedAt={post.createdAt?.toDate()}
      />
      <CommentModal postId={post.id} />
    </div>
  );
};

export default PostItem;
