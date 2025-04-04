import { Timestamp } from "firebase/firestore";
import {
  FieldErrors,
  UseFormRegister,
  FieldValues,
  Path,
} from "react-hook-form";

export type SignUpForm = {
  name: string;
  email: string;
};

export type SignPassForm = {
  password: string;
};

export interface NameInpProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  regName: Path<T>;
  label: string;
  type: string;
}

export type PasswordBtnProps = {
  password: string;
};
export type NextBtnProps = {
  name: string;
  email: string;
};

export type RegisterBtnType = {
  btnColor: string;
  btnTxt: string;
  btnIcon?: React.JSX.Element;
  btnBorder?: string;
  btnFont: string;
  btnTxtColor?: string;
  FixImageGap?: string;
  hover?: string;
  onClick?: () => void;
};

export type PassSignType = {
  onClose: () => void;
  email: string;
  name: string;
};

export type SeenTypes = {
  seen: boolean;
  setSeen: () => void;
};

export type UserFoundTypes = {
  userNotFound: boolean;
  setUserNotFound: (value: boolean) => void;
};

export type RegisterStepTypes = {
  firstLevel: boolean;
  passwordLevel: boolean;
  setToPasswordLevel: () => void;
  setToPasswordLevelReverse: () => void;
};

export type DateState = {
  selectedMonth: number | "";
  setSelectedMonth: (month: number | "") => void;
  selectedDay: number | "";
  setSelectedDay: (day: number | "") => void;
  selectedYear: number | "";
  setSelectedYear: (day: number | "") => void;
  resetDate: () => void;
};

export type CrAccType = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export type LogInType = {
  openLogIn: boolean;
  setOpenLogIn: (value: boolean) => void;
};

export type LogInStore = {
  email: string;
  setEmail: (email: string) => void;

  password: string;
  setPassword: (password: string) => void;
};

export type ParamsType = {
  params: {
    id: string;
  };
};
export type PropsType = {
  pathName: string;
};
export type ForYouBtnType = {
  forYou: boolean;
  btnTxt: string;
};
export type ForYouTypes = {
  forYou: boolean;
  setForYou: () => void;
};

export type PostState = {
  image: string | null;
  setImage: (image: string | null) => void;
};

export type PostsType = {
  text: string;
  file: File | null;
  setText: (value: string) => void;
  setFile: (file: File | null) => void;
};

export type PostContextType = {
  id: string;
  text: string;
  imageUrl: string;
  authorEmail: string;
  name: string;
  createdAt: Timestamp | null;
  likes: string[];
  bookmarks: string[];
  profilePicture: string;
  username: string;
};
export type PostStore = {
  posts: PostContextType[];
  setPosts: (posts: PostContextType[]) => void;
};

export type User = {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
  username: string;
};

export type UserStore = {
  users: User[];
  setUsers: (users: User[]) => void;
};

export type PostBtnProps = {
  disabled: boolean;
  btnText: string;
};

export type WorldType = {
  world: boolean;
  setWorld: (value: boolean) => void;
};

export type HoverStore = {
  moreColor: string | null;
  setMoreColor: (id: string | null) => void;
};

export type CurrentUserType = {
  name: string;
  email: string;
  username: string;
  setCurrentUser: (user: {
    name: string;
    email: string;
    username: string;
  }) => void;
  clearCurrentUser: () => void;
};

export type UserProfileStore = {
  name: string;
  setName: (name: string) => void;

  postsCount: number;
  setPostsCount: (count: number) => void;

  followersCount: number;
  setFollowersCount: (count: number) => void;

  followingCount: number;
  setFollowingCount: (count: number) => void;

  profilePicture: string;
  setProfilePicture: (url: string) => void;

  coverPhoto: string;
  setCoverPhoto: (url: string) => void;
};

export type MoreDivTypes = {
  moreDiv: string | null;
  setMoreDiv: (id: string | null) => void;
};

export type CommentMoreDivTypes = {
  commentMoreDiv: string | null;
  setCommentMoreDiv: (id: string | null) => void;
};

export type AddCommentProps = {
  postId: string;
  postAuthorName: string;
  postAuthorEmail: string;
  postCreatedAt?: Date;
  postProfilePicture: string;
};

export type AddPostProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  placeholder?: string;
  text: string;
  setText: (text: string) => void;
  image: string | null;
  file?: File | null;
  setImage: (img: string | null) => void;
  setFile: (file: File | null) => void;
  profilePicture: string;
  btnText: string;
  hidden?: string;
  inputId: string;
  border?: string;
  topgap?: string;
};

export type PostItemProps = {
  post: PostContextType;
};

export type CommentType = {
  id: string;
  commentText: string;
  commentAuthor: string;
  commentCreatedAt: Timestamp;
  commentImage?: string;
};

export type CommentProps = {
  postId: string;
  comment: CommentType;
  onDelete: () => void;
};
export type CommentModalTypes = {
  postId: string;
};
export type IconProps = {
  username: string;
  path: string;
};
export type UserType = {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
};
