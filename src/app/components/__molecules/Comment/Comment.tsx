import { useEffect, useRef, useState } from "react";
import { useCommentMoreDiv } from "@/app/common/hooks/Store";
import EditIcon from "@/app/common/icons/EditIcon";
import ReportIcon from "@/app/common/icons/ReportIcon";
import Unsmile from "@/app/common/icons/Unsmile";
import Image from "next/image";
import { auth, db } from "@/app/firebase/config";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import ReactTimeAgo from "react-time-ago";
import TextareaAutosize from "react-textarea-autosize";
import Delete from "@/app/common/icons/Delete";
import { CommentProps } from "@/app/common/Types/Common";

function Comment({ comment, postId, onDelete }: CommentProps) {
  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState(comment.commentText);
  const [authorData, setAuthorData] = useState<{
    name: string;
    profilePicture: string;
  } | null>(null);

  const commentMoreDiv = useCommentMoreDiv((state) => state.commentMoreDiv);
  const [currentUsername, setCurrentUsername] = useState<string>("");
  const setCommentMoreDiv = useCommentMoreDiv(
    (state) => state.setCommentMoreDiv
  );
  const divRef = useRef<HTMLDivElement | null>(null);
  const EditDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        commentMoreDiv === comment.id &&
        divRef.current &&
        !divRef.current.contains(event.target as Node)
      ) {
        setCommentMoreDiv(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [commentMoreDiv, postId]);

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
          setCurrentUsername(userSnap.data().email);
        }
      }
    };

    fetchCurrentUsername();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", comment.commentAuthor));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();
          setAuthorData({
            name: userData.name,
            profilePicture: userData.profilePicture,
          });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [comment.commentAuthor]);

  const showMoreOptions = () => {
    setCommentMoreDiv(comment.id);
  };

  const TextAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleDeleteComment = async () => {
    try {
      await deleteDoc(doc(db, "posts", postId, "comments", comment.id));
      setCommentMoreDiv(null);
      onDelete();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  function EditTxt() {
    setEdit(true);
    setCommentMoreDiv(null);

    setTimeout(() => {
      if (TextAreaRef.current) {
        TextAreaRef.current.focus();
      }
    }, 100);
  }

  const handleSaveEdit = async () => {
    try {
      const ref = doc(db, "posts", postId, "comments", comment.id);
      await updateDoc(ref, {
        commentText: editText,
      });

      comment.commentText = editText;

      setEdit(false);
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  return (
    <div className="border border-[#2F3336] pt-[10px] p-[10px] flex gap-[8px]">
      <div className="w-[40px] h-[40px] rounded-[50px] overflow-hidden flex-shrink-0">
        {authorData && (
          <Image
            src={authorData.profilePicture}
            alt="profile"
            className="w-full h-full object-cover rounded-[50px]"
            width={500}
            height={500}
          />
        )}
      </div>

      <div className="flex flex-col items-start w-full min-w-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-[8px]">
            <h3 className="text-white font-bold hover:underline">
              {authorData?.name}
            </h3>
            <h3 className="text-[#71767B] text-[14px] font-semibold">
              @{comment.commentAuthor.split("@")[0]}
            </h3>
            <div className="w-[3px] h-[3px] rounded-full bg-[#71767B]"></div>
            <h3 className="text-[#71767B] text-[14px] font-semibold">
              {comment.commentCreatedAt && (
                <ReactTimeAgo
                  date={comment.commentCreatedAt.toDate()}
                  locale="en-US"
                />
              )}
            </h3>
          </div>

          <div className="relative">
            {commentMoreDiv === comment.id && (
              <div ref={divRef} className="absolute right-0 z-50">
                <div className="pt-[10px] pb-[10px] w-[170px] pl-[10px] pr-[10px] flex flex-col bg-black border border-white/20 shadow-white shadow-sm rounded-[10px] gap-[20px]">
                  {currentUsername != comment.commentAuthor && (
                    <button
                      onClick={() => setCommentMoreDiv(null)}
                      className="flex gap-[10px]"
                    >
                      <div className="w-[25px] h-[25px]">
                        <ReportIcon />
                      </div>
                      <h3 className="text-white">Report</h3>
                    </button>
                  )}
                  {currentUsername != comment.commentAuthor && (
                    <button
                      onClick={() => setCommentMoreDiv(null)}
                      className="flex gap-[10px]"
                    >
                      <div className="w-[25px] h-[25px]">
                        <Unsmile />
                      </div>
                      <h3 className="text-white">Not interested</h3>
                    </button>
                  )}
                  {currentUsername === comment.commentAuthor && (
                    <button onClick={EditTxt} className="flex gap-[10px]">
                      <div className="w-[25px] h-[25px]">
                        <EditIcon />
                      </div>
                      <h3 className="text-white">Edit text</h3>
                    </button>
                  )}
                  {currentUsername === comment.commentAuthor && (
                    <button
                      onClick={handleDeleteComment}
                      className="flex gap-[2px]"
                    >
                      <div className="w-[22px] h-[22px]">
                        <Delete />
                      </div>
                      <h3 className="text-[red]">Delete comment</h3>
                    </button>
                  )}
                </div>
              </div>
            )}
            <div
              onClick={showMoreOptions}
              className="flex gap-[2px] cursor-pointer pt-[15px] pb-[15px] pl-[10px] pr-[10px] rounded-full hover:bg-[#0A171F]"
            >
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-[3px] h-[3px] rounded-full bg-[#71767B]"
                ></div>
              ))}
            </div>
          </div>
        </div>

        {!edit && (
          <p className="text-white break-words whitespace-pre-wrap">
            {comment.commentText}
          </p>
        )}

        {edit && (
          <div
            ref={EditDivRef}
            className="flex w-full gap-[20px] justify-between"
          >
            <TextareaAutosize
              ref={TextAreaRef}
              className="text-white w-full resize-none bg-transparent"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <button
              onClick={handleSaveEdit}
              className="bg-black h-[40px] border border-white rounded-[10px] font-semibold px-[10px] text-white"
            >
              Save
            </button>
          </div>
        )}

        {comment.commentImage && (
          <div className="w-full pr-[10px] flex justify-center max-h-[300px] mb-[10px]">
            <Image
              height={700}
              width={700}
              src={comment.commentImage}
              alt="Comment Image"
              className="mt-[10px] w-auto h-full max-w-full rounded-[20px]"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;
