import {
  useAddComment,
  useCommentStore,
  useThemeColors,
  useUserProfile,
} from "@/app/common/hooks/Store";
import { auth, db } from "@/app/firebase/config";
import { Box, Modal } from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React from "react";
import AddPost from "../AddPost/AddPost";
import ReactTimeAgo from "react-time-ago";
import Image from "next/image";
import { AddCommentProps } from "@/app/common/Types/Common";

function AddComment({
  postId,
  postAuthorName,
  postAuthorEmail,
  postCreatedAt,
  postProfilePicture,
}: AddCommentProps) {
  const commentModal = useAddComment((state) => state.commentModal);
  const setCommentModal = useAddComment((state) => state.setCommentModal);
  const isOpen = commentModal === postId;
  const text = useCommentStore((state) => state.text);
  const setText = useCommentStore((state) => state.setText);
  const image = useCommentStore((state) => state.image);
  const setImage = useCommentStore((state) => state.setImage);
  const setFile = useCommentStore((state) => state.setFile);
  const profilePicture = useUserProfile((state) => state.profilePicture);
  const contentColor = useThemeColors((state) => state.contentColor);

  function CloseCommentModal() {
    setCommentModal(null);
    setText("");
    setImage("");
    setFile(null);
  }

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (text.trim() === "" && !image) {
      alert("Empty comment");
      return;
    }

    try {
      setCommentModal(null);
      setText("");
      setImage("");
      setFile(null);
      await addDoc(collection(db, "posts", postId, "comments"), {
        commentText: text,
        commentAuthor: user?.email,
        commentCreatedAt: serverTimestamp(),
        commentImage: image || null,
        commentLikes: [],
      });
    } catch (err) {
      console.error("Error commenting: ", err);
    }
  };

  return (
    <>
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
          <div
            className={`w-[570px] max-[630px]:w-[350px]   ml-[10px] mr-[10px] rounded-[20px]  bg-[${contentColor}] flex  flex-col pt-[15px]  relative`}
          >
            <div className="w-full flex justify-start pl-[10px] mb-[15px]">
              <div
                onClick={() => setCommentModal(null)}
                className="w-[40px] h-[40px] cursor-pointer  hover:bg-[grey] rounded-[100%] flex justify-center items-center "
              >
                <h1
                  className={`${
                    contentColor === "white" ? "text-black" : "text-white"
                  }`}
                >
                  X
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-[5px] w-full pl-[20px]">
              <div className="w-[40px] h-[40px] rounded-[100%] shrink-0">
                <Image
                  src={postProfilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-[50px]"
                  width={500}
                  height={500}
                />
              </div>
              <h2
                className={`font-semibold ${
                  contentColor === "white" ? "text-black" : "text-white"
                }`}
              >
                {postAuthorName}
              </h2>
              <h3 className="text-[#71767B] text-[14px] font-semibold">
                @{postAuthorEmail.split("@")[0]}
              </h3>
              <div className="w-[2px] h-[2px] rounded-[100%] bg-[#71767B]"></div>
              <h3 className="text-[#71767B] text-[14px] font-semibold">
                {postCreatedAt && (
                  <ReactTimeAgo date={postCreatedAt} locale="en-US" />
                )}
              </h3>
            </div>
            <div className="ml-[40px] mt-[10px] flex items-center  h-[70px] border-l-[2px] border-l-[#71767B] pl-[20px]">
              <h2 className="text-[#71767B]">
                Replying to{" "}
                <span className="text-[#1D9BF0]">@{postAuthorName}</span>
              </h2>
            </div>
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
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default AddComment;
