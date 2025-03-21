import * as yup from "yup";

export const SignUpSchema = yup.object().shape({
  name: yup
    .string()
    .required("Can't be empty")
    .matches(/^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/, "What's your name?")
    .min(8, "At least 8 characters.")
    .max(26, "26 is max"),
  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email"
    ),
});

export const SignUpSchemaPass = yup.object().shape({
  password: yup
    .string()
    .required("Can't be empty")
    .min(8)
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Invalid password"
    ),
});
