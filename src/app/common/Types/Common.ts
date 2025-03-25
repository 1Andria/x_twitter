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
export type ForYouBtnType = {
  forYou: boolean;
  btnTxt: string;
};
export type ForYouTypes = {
  forYou: boolean;
  setForYou: () => void;
};

export type PostState = {
  image: string;
  setImage: (image: string) => void;
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
};
