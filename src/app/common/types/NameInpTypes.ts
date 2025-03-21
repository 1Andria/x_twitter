import { FieldErrors, UseFormRegister } from "react-hook-form";

export type SignUpForm = {
  name: string;
  email: string;
  password: string;
};

export interface NameInpProps {
  register: UseFormRegister<SignUpForm>;
  errors: FieldErrors<SignUpForm>;
  regName: keyof SignUpForm;
  label: string;
  type: string;
}
