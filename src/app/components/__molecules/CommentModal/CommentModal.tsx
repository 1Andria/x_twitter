"use client";
import {
  useAddComment,
  useCommentModal,
  useCommentStore,
  useUserProfile,
} from "@/app/common/hooks/Store";
import { auth, db } from "@/app/firebase/config";
import { Box, Modal } from "@mui/material";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import AddPost from "../AddPost/AddPost";
import Comment from "../Comment/Comment";
import { CommentModalTypes, CommentType } from "@/app/common/Types/Common";

function CommentModal({ postId }: CommentModalTypes) {
  const allComments = useCommentModal((state) => state.allComments);
  const setAllComments = useCommentModal((state) => state.setAllComments);
  const isOpen = allComments === postId;
  const text = useCommentStore((state) => state.text);
  const setText = useCommentStore((state) => state.setText);
  const image = useCommentStore((state) => state.image);
  const setImage = useCommentStore((state) => state.setImage);
  const setFile = useCommentStore((state) => state.setFile);
  const profilePicture = useUserProfile((state) => state.profilePicture);
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const querySnapshot = await getDocs(
        query(
          collection(db, "posts", postId, "comments"),
          orderBy("commentCreatedAt", "desc")
        )
      );

      const fetched: CommentType[] = [];

      querySnapshot.forEach((doc) => {
        fetched.push({
          id: doc.id,
          ...doc.data(),
        } as CommentType);
      });

      setComments(fetched);
    };

    if (isOpen) fetchComments();
  }, [isOpen, postId]);

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (text.trim() === "" && !image) {
      alert("Empty comment");
      return;
    }

    try {
      await addDoc(collection(db, "posts", postId, "comments"), {
        commentText: text,
        commentAuthor: user?.email,
        commentCreatedAt: serverTimestamp(),
        commentImage: image || null,
        commentLikes: [],
      });

      setText("");
      setImage("");
      setFile(null);

      const updatedSnapshot = await getDocs(
        collection(db, "posts", postId, "comments")
      );
      const updatedComments: CommentType[] = [];
      updatedSnapshot.forEach((doc) => {
        updatedComments.push({ id: doc.id, ...doc.data() } as CommentType);
      });
      setComments(updatedComments);
    } catch (err) {
      console.error("Error commenting: ", err);
    }
  };

  function CloseCommentModal() {
    setAllComments(null);
  }

  return (
    <Modal
      open={isOpen}
      onClose={CloseCommentModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(36, 45, 52, 0.4)",
            opacity: "0.5",
          },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="w-[570px] max-[630px]:w-[350px] h-[650px] ml-[10px] mr-[10px] rounded-[20px] bg-black flex flex-col pt-[15px] relative">
          <div className="pl-[5px]">
            <AddPost
              inputId={`comment-image-${postId}`}
              btnText="Reply"
              onSubmit={handleCommentSubmit}
              placeholder="Write a reply..."
              text={text}
              setText={setText}
              image={image}
              setImage={setImage}
              setFile={setFile}
              profilePicture={profilePicture}
              hidden="hidden"
            />
          </div>

          <div className="w-full h-full overflow-y-auto ">
            {comments.length === 0 ? (
              <p className="text-center text-white text-sm mt-4">
                No comments yet
              </p>
            ) : (
              comments.map((comment) => (
                <Comment
                  postId={postId}
                  key={comment.id}
                  comment={comment}
                  onDelete={() =>
                    setComments((prev) =>
                      prev.filter((c) => c.id !== comment.id)
                    )
                  }
                />
              ))
            )}
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default CommentModal;
