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
  ProfileContextTypes,
  MessageInputStore,
  CommentModal,
  AddCommentTypes,
  EditProfileTypes,
  CoverTypes,
  SearchValueTypes,
  NavBarPostTypes,
  CommentState,
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
import { SelectedUserType } from "@/app/components/__molecules/MessagesContext/MessagesContext";

export const useUserProfile = create<UserProfileStore>((set) => ({
  name: "",
  setName: (name) => set({ name }),

  postsCount: 0,
  setPostsCount: (count) => set({ postsCount: count }),

  profilePicture: ProfilePicture.src,
  setProfilePicture: (url) => set({ profilePicture: url }),

  coverPhoto: "",
  setCoverPhoto: (url) => set(() => ({ coverPhoto: url })),

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
  setWorld: (value) => set(() => ({ world: value })),
}));

export const useHoverStore = create<HoverStore>((set) => ({
  moreColor: null,
  setMoreColor: (id) => set({ moreColor: id }),
}));
export type SelectedUserTypes = {
  selectedUser: SelectedUserType | null;
  setSelectedUser: (user: SelectedUserType | null) => void;
};

export const useSelectedUser = create<SelectedUserTypes>((set) => ({
  selectedUser: null,
  setSelectedUser: (id) => set({ selectedUser: id }),
}));

export const useCommentMoreDiv = create<CommentMoreDivTypes>((set) => ({
  commentMoreDiv: null,
  setCommentMoreDiv: (id) => set(() => ({ commentMoreDiv: id })),
}));

export const usePostData = create<PostStore>((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
}));

export const useProfileContext = create<ProfileContextTypes>((set) => ({
  profilePicture: "",
  setProfilePicture: (url) => set({ profilePicture: url }),
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

export const useCover = create<CoverTypes>((set) => ({
  toCover: false,
  setToCover: (value) => set(() => ({ toCover: value })),
}));

export const useEditProfile = create<EditProfileTypes>((set) => ({
  editProfile: false,
  setEditProfile: () => set((state) => ({ editProfile: !state.editProfile })),
}));

export const useAddComment = create<AddCommentTypes>((set) => ({
  commentModal: null,
  setCommentModal: (postId) => set({ commentModal: postId }),
}));

export const useCommentModal = create<CommentModal>((set) => ({
  allComments: null,
  setAllComments: (postId) => set({ allComments: postId }),
}));

export const useCommentStore = create<CommentState>((set) => ({
  text: "",
  image: null,
  file: null,
  setText: (text) => set({ text }),
  setImage: (image) => set({ image }),
  setFile: (file) => set({ file }),
}));

export const useNavBarPost = create<NavBarPostTypes>((set) => ({
  navBarPost: false,
  setNavBarPost: (value) => set(() => ({ navBarPost: value })),
}));

export const useSearchValue = create<SearchValueTypes>((set) => ({
  searchValue: "",
  setSearchValue: (value) => set(() => ({ searchValue: value })),
}));

export const useMessageInputStore = create<MessageInputStore>((set) => ({
  text: "",
  image: null,
  file: null,
  setText: (text) => set({ text }),
  setImage: (image) => set({ image }),
  setFile: (file) => set({ file }),
  reset: () => set({ text: "", image: null, file: null }),
}));
