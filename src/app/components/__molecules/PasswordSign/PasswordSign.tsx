import XIcon from "@/app/common/icons/xIcon";
import React from "react";
import SignInp from "../../__atoms/NameInp/NameInp";
import { SignPassForm } from "@/app/common/types/NameInpTypes";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpSchemaPass } from "@/app/common/schemas/SignUpSchema";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRegistrationSteps } from "@/app/common/hooks/zustand/RegistSteps";
import Eye from "@/app/common/icons/Eye";
import { useSeenPassword } from "@/app/common/hooks/zustand/Seen";
import PasswordBtn from "../../__atoms/PasswordBtn/PasswordBtn";

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
  const setToPasswordLevelReverse = useRegistrationSteps(
    (state) => state.setToPasswordLevelReverse
  );

  const password = watch("password");

  const onSubmitPassword = (data: SignPassForm) => {
    console.log("Password Step Data:", data);
    reset();
  };

  const seen = useSeenPassword((state) => state.seen);
  const setSeen = useSeenPassword((state) => state.setSeen);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmitPassword)}
        className="w-[570px]  ml-[20px] mr-[20px] h-[640px] rounded-[20px] pr-[60px] pl-[60px] bg-black flex  flex-col pt-[15px] pb-[40px] relative justify-between"
      >
        <div>
          <div
            onClick={setToPasswordLevelReverse}
            className=" rounded-[5px] cursor-pointer  hover:bg-[#4E5050] w-[50px] h-[25px] flex justify-center items-center absolute top-[20px] left-[20px]"
          >
            <h1 className=" text-white">Back</h1>
          </div>
          <div className="w-full flex justify-center ">
            <div className="w-[30px] h-[30px]">
              <XIcon />
            </div>
          </div>
          <h1 className="text-white text-[30px] font-semibold mt-[30px]">
            You'll need a password
          </h1>
          <p className="text-[#6C7075] mt-[5px]">
            Make sure it’s 8 characters or more.
          </p>
          <div className="relative mt-[30px]">
            <SignInp
              register={register}
              errors={errors}
              regName="password"
              label="Password"
              type={seen ? "text" : "password"}
            />
            <div
              onClick={setSeen}
              className="w-[25px] h-[25px] cursor-pointer absolute top-[18px] right-[20px]"
            >
              {seen && (
                <div className="w-full h-[2px] bg-white absolute transform rotate-45 top-[11px]"></div>
              )}
              <Eye />
            </div>
          </div>
        </div>
        <div>
          <p className="text-[#6C7075] text-[12px] mb-[30px]">
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
            . X may use your contact information, including your email address
            and phone number for purposes outlined in our Privacy Policy, like
            keeping your account secure and personalizing our services,
            including ads.
            <Link
              target="_blank"
              href={"https://x.com/en/privacy"}
              className="text-[#1D9BF0] hover:underline cursor-pointer"
            >
              learn more
            </Link>
            . Others will be able to find you by email or phone number, when
            provided, unless you choose otherwise here.
          </p>
          <PasswordBtn password={password} />
        </div>
      </form>
    </>
  );
}

export default PasswordSign;
