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
