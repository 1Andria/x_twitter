import { create } from "zustand";
import {
  CrAccType,
  ForYouTypes,
  LogInStore,
  LogInType,
  PostState,
  PostsType,
  UserFoundTypes,
  UserStore,
  WorldType,
  SeenTypes,
  DateState,
  RegisterStepTypes,
  HoverStore,
  PostStore,
  CurrentUserType,
  UserProfileStore,
  MoreDivTypes,
  CommentMoreDivTypes,
} from "../Types/Common";

export const useCreateAcc = create<CrAccType>((set) => ({
  open: false,
  setOpen: (value) => set(() => ({ open: value })),
}));

export const useLogIn = create<LogInType>((set) => ({
  openLogIn: false,
  setOpenLogIn: (value) => set(() => ({ openLogIn: value })),
}));

export const useSeenPassword = create<SeenTypes>((set) => ({
  seen: false,
  setSeen: () => set((state) => ({ seen: !state.seen })),
}));

export const useRegistrationSteps = create<RegisterStepTypes>((set) => ({
  firstLevel: true,
  passwordLevel: false,
  setToPasswordLevel: () =>
    set(() => ({
      firstLevel: false,
      passwordLevel: true,
    })),
  setToPasswordLevelReverse: () =>
    set(() => ({
      firstLevel: true,
      passwordLevel: false,
    })),
}));

export const useDate = create<DateState>((set) => ({
  selectedMonth: "",
  setSelectedMonth: (month) => set({ selectedMonth: month }),
  selectedDay: "",
  setSelectedDay: (day) => set({ selectedDay: day }),
  selectedYear: "",
  setSelectedYear: (year) => set({ selectedYear: year }),
  resetDate: () =>
    set({
      selectedMonth: "",
      selectedDay: "",
      selectedYear: "",
    }),
}));

export const useLogInStore = create<LogInStore>((set) => ({
  email: "",
  setEmail: (email: string) => set({ email }),

  password: "",
  setPassword: (password: string) => set({ password }),
}));

export const useNotFound = create<UserFoundTypes>((set) => ({
  userNotFound: false,
  setUserNotFound: (value) => set(() => ({ userNotFound: value })),
}));
import ProfilePicture from "../icons/profile.jpg";

export const useUserProfile = create<UserProfileStore>((set) => ({
  name: "",
  setName: (name) => set({ name }),

  postsCount: 0,
  setPostsCount: (count) => set({ postsCount: count }),

  profilePicture: ProfilePicture.src,
  setProfilePicture: (url) => set({ profilePicture: url }),

  coverPhoto: "",
  setCoverPhoto: (url) => set((state) => ({ coverPhoto: url })),

  followersCount: 0,
  setFollowersCount: (count) => set({ followersCount: count }),

  followingCount: 0,
  setFollowingCount: (count) => set({ followingCount: count }),
}));

export const useForYou = create<ForYouTypes>((set) => ({
  forYou: true,
  setForYou: () => set((state) => ({ forYou: !state.forYou })),
}));

export const usePostImage = create<PostState>((set) => ({
  image: null,
  setImage: (image) => set({ image }),
}));

export const usePostStore = create<PostsType>((set) => ({
  text: "",
  file: null,

  setText: (value) => set({ text: value }),
  setFile: (file) => set({ file }),
}));

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
}));

export const useWorldState = create<WorldType>((set) => ({
  world: false,
  setWorld: (value) => set((state) => ({ world: value })),
}));

export const useHoverStore = create<HoverStore>((set) => ({
  moreColor: null,
  setMoreColor: (id) => set({ moreColor: id }),
}));

export const useCommentMoreDiv = create<CommentMoreDivTypes>((set) => ({
  commentMoreDiv: null,
  setCommentMoreDiv: (id) => set(() => ({ commentMoreDiv: id })),
}));

export const usePostData = create<PostStore>((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
}));

export const useCurrentUser = create<CurrentUserType>((set) => ({
  name: "",
  email: "",
  username: "",
  setCurrentUser: (user) =>
    set({
      name: user.name,
      email: user.email,
      username: user.username,
    }),
  clearCurrentUser: () => set({ name: "", email: "", username: "" }),
}));

export const useMoreInfo = create<MoreDivTypes>((set) => ({
  moreDiv: null,
  setMoreDiv: (id) => set(() => ({ moreDiv: id })),
}));

export type CoverTypes = {
  toCover: boolean;
  setToCover: (value: boolean) => void;
};

export const useCover = create<CoverTypes>((set) => ({
  toCover: false,
  setToCover: (value) => set(() => ({ toCover: value })),
}));

export type EditProfileTypes = {
  editProfile: boolean;
  setEditProfile: () => void;
};

export const useEditProfile = create<EditProfileTypes>((set) => ({
  editProfile: false,
  setEditProfile: () => set((state) => ({ editProfile: !state.editProfile })),
}));

export type AddCommentTypes = {
  commentModal: string | null;
  setCommentModal: (postId: string | null) => void;
};

export const useAddComment = create<AddCommentTypes>((set) => ({
  commentModal: null,
  setCommentModal: (postId) => set({ commentModal: postId }),
}));

export type CommentModal = {
  allComments: string | null;
  setAllComments: (postId: string | null) => void;
};

export const useCommentModal = create<CommentModal>((set) => ({
  allComments: null,
  setAllComments: (postId) => set({ allComments: postId }),
}));

type CommentState = {
  text: string;
  image: string | null;
  file: File | null;
  setText: (text: string) => void;
  setImage: (image: string | null) => void;
  setFile: (file: File | null) => void;
};

export const useCommentStore = create<CommentState>((set) => ({
  text: "",
  image: null,
  file: null,
  setText: (text) => set({ text }),
  setImage: (image) => set({ image }),
  setFile: (file) => set({ file }),
}));
