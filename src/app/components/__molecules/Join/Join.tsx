import React from "react";
import RegisterBtn from "../../__atoms/RegisterBtn/RegisterBtn";
import Google from "@/app/common/icons/Google";
import Apple from "@/app/common/icons/Apple";
import Link from "next/link";

function Join() {
  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-white font-extrabold text-[80px]">Happening now</h1>
        <div className="flex flex-col max-w-[340px] w-full gap-[10px] mt-[35px] ">
          <h3 className="text-white font-bold text-[40px] mb-[15px] ">
            join today.
          </h3>
          <RegisterBtn
            btnColor="bg-white"
            btnTxt="sign up with google"
            btnIcon={<Google />}
            btnFont="font-normal"
          />
          <RegisterBtn
            btnColor="bg-white"
            btnTxt="Sign up with Apple"
            btnIcon={<Apple />}
            btnFont="font-semibold"
          />
          <div className="flex items-center gap-[10px]">
            <div className="w-full h-[1px] bg-[#2F3336]"></div>
            <h4 className="text-[#DBDDDE]">or</h4>
            <div className="w-full h-[1px] bg-[#2F3336]"></div>
          </div>
          <div className="flex flex-col gap-[4px]">
            <RegisterBtn
              btnColor="bg-[#1A8CD8]"
              btnTxtColor="text-white"
              btnTxt="Create account"
              btnFont="font-semibold"
              FixImageGap="pr-[20px]"
            />
            <p className="text-[#71767B] text-[10px]">
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
              .
            </p>
          </div>
          <div className="flex flex-col gap-[15px] mt-[35px]">
            <h2 className="text-white font-semibold">
              Already have an account?
            </h2>
            <RegisterBtn
              hover="hover:bg-[#031018]"
              btnColor="bg-[transparent]"
              btnTxt="Sign in"
              btnTxtColor="text-[#1D9BF0]"
              FixImageGap="pr-[20px]"
              btnFont="font-semibold"
              btnBorder="border-[1px] border-dotted border-[red]"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Join;
