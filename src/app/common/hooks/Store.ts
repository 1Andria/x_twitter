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
  PostContextType,
  PostStore,
  CurrentUserType,
  UserProfileStore,
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

export const useUserProfile = create<UserProfileStore>((set) => ({
  name: "",
  setName: (name) => set({ name }),

  postsCount: 0,
  setPostsCount: (count) => set({ postsCount: count }),

  profilePicture:
    "https://i.pinimg.com/736x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg",
  setProfilePicture: (url) => set({ profilePicture: url }),
}));

export const useForYou = create<ForYouTypes>((set) => ({
  forYou: true,
  setForYou: () => set((state) => ({ forYou: !state.forYou })),
}));

export const usePostImage = create<PostState>((set) => ({
  image: "",
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


