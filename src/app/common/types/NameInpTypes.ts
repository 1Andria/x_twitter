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
