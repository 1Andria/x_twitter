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
