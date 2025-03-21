import XIcon from "@/app/common/icons/xIcon";
import React from "react";
import SignInp from "../../__atoms/NameInp/NameInp";
import { SignPassForm, SignUpForm } from "@/app/common/types/NameInpTypes";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpSchemaPass } from "@/app/common/schemas/SignUpSchema";
import { useForm } from "react-hook-form";
import Link from "next/link";

function PasswordSign() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<SignPassForm>({
    resolver: yupResolver(SignUpSchemaPass),
  });

  const onSubmitPassword = (data: SignPassForm) => {
    console.log("Password Step Data:", data);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmitPassword)}
        className="w-[570px] ml-[20px] mr-[20px] h-[640px] rounded-[20px] pr-[60px] pl-[60px] bg-black flex  flex-col pt-[15px] pb-[40px]"
      >
        <div>
          <div className="w-full flex justify-center ">
            <div className="w-[30px] h-[30px]">
              <XIcon />
            </div>
          </div>
          <h1 className="text-white text-[30px] font-semibold">
            You'll need a password
          </h1>
          <p className="text-[#6C7075]">Make sure it’s 8 characters or more.</p>
          <SignInp
            register={register}
            errors={errors}
            regName="password"
            label="Password"
            type="password"
          />
        </div>
        <p className="text-[#6C7075] text-[12px]">
          By signing up, you agree to the{" "}
          <Link
            href={"https://x.com/en/tos"}
            target="_blank"
            className="text-[#1D9BF0] hover:underline cursor-pointer"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href={"https://x.com/en/privacy"}
            target="_blank"
            className="text-[#1D9BF0] hover:underline cursor-pointer"
          >
            Privacy Policy
          </Link>
          , including{" "}
          <Link
            target="_blank"
            href={"https://help.x.com/en/rules-and-policies/x-cookies"}
            className="text-[#1D9BF0] hover:underline cursor-pointer"
          >
            Cookie Use
          </Link>
          . X may use your contact information, including your email address and
          phone number for purposes outlined in our Privacy Policy, like keeping
          your account secure and personalizing our services, including ads.
          Learn more. Others will be able to find you by email or phone number,
          when provided, unless you choose otherwise here.
        </p>
      </form>
    </>
  );
}

export default PasswordSign;
