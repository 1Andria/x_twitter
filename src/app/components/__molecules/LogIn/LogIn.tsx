import XIcon from "@/app/common/icons/xIcon";
import { Box, Modal, TextField } from "@mui/material";
import React from "react";
import RegisterBtn from "../../__atoms/RegisterBtn/RegisterBtn";
import Google from "@/app/common/icons/Google";
import { OpenGoogle } from "@/app/common/functions/OpnGglAcc";
import Apple from "@/app/common/icons/Apple";
import { OpenApple } from "@/app/common/functions/OpnAplAcc";
import LogPass from "../../__atoms/LogPass/LogPass";
import {
  useCreateAcc,
  useLogIn,
  useLogInStore,
  useNotFound,
} from "@/app/common/hooks/Store";
import { auth } from "@/app/firebase/config";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

function LogIn() {
  const openLogIn = useLogIn((state) => state.openLogIn);
  const setOpenLogIn = useLogIn((state) => state.setOpenLogIn);
  const setOpenSign = useCreateAcc((state) => state.setOpen);

  function ToSignUp() {
    setOpenLogIn(false);
    setOpenSign(true);
  }

  const email = useLogInStore((state) => state.email);
  const password = useLogInStore((state) => state.password);
  const setEmail = useLogInStore((state) => state.setEmail);
  const setPassword = useLogInStore((state) => state.setPassword);
  const userNotFound = useNotFound((state) => state.userNotFound);

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signInWithEmailAndPassword(email, password);
    if (res) {
      setEmail("");
      setPassword("");
      setOpenLogIn(false);
      router.push("xpage/username");
      useNotFound.getState().setUserNotFound(false);
    } else {
      useNotFound.getState().setUserNotFound(true);
    }
  };

  function onClose() {
    setOpenLogIn(false);
    setEmail("");
    setPassword("");
    useNotFound.getState().setUserNotFound(false);
  }

  return (
    <>
      <Modal
        open={openLogIn}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "rgba(36, 45, 52, 0.5)",
              opacity: "0.5",
            },
          },
        }}
        className="w-full"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <form
            onSubmit={handleSignIn}
            className="w-[470px] ml-[10px] mr-[10px] h-[640px] rounded-[20px] pr-[65px] pl-[65px] bg-black flex flex-col pt-[15px] pb-[80px] relative items-center justify-between"
          >
            <div
              onClick={onClose}
              className="rounded-[50%] cursor-pointer hover:bg-[#4E5050] w-[25px] h-[25px] flex justify-center items-center absolute top-[20px] left-[20px]"
            >
              <h1 className="text-white">X</h1>
            </div>

            <div className="w-full flex justify-center">
              <div className="w-[30px] h-[30px]">
                <XIcon />
              </div>
            </div>

            <div className="w-full flex justify-start">
              <h1 className="text-white text-[30px] font-semibold">
                Sign in to X
              </h1>
            </div>

            <RegisterBtn
              btnColor="bg-white"
              btnTxt="Sign in with Google"
              btnIcon={<Google />}
              btnFont="font-normal"
              onClick={OpenGoogle}
            />

            <RegisterBtn
              btnColor="bg-white"
              btnTxt="Sign in with Apple"
              btnIcon={<Apple />}
              btnFont="font-semibold"
              onClick={OpenApple}
            />

            <div className="flex items-center gap-[10px] w-full">
              <div className="w-full h-[1px] bg-[#2F3336]"></div>
              <h4 className="text-[#DBDDDE]">or</h4>
              <div className="w-full h-[1px] bg-[#2F3336]"></div>
            </div>
            <div className="w-full flex justify-start">
              <h3
                className={`text-[#FC4747] text-[12px] ${
                  userNotFound ? "opacity-[1]" : "opacity-0"
                }`}
              >
                User not found!Try again or{" "}
                <span
                  onClick={ToSignUp}
                  className="text-[12px] hover:underline cursor-pointer text-[#1976d2] font-bold"
                >
                  Sign up
                </span>
              </h3>
            </div>
            <TextField
              id="email"
              label="Email"
              variant="filled"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                input: { color: "white", border: "1px solid #6C7075" },
                label: { color: "#6C7075" },
                "& .MuiFilledInput-root": {
                  backgroundColor: "transparent",
                  borderRadius: "4px",
                  border: "1px solid #6C7075",
                  "&:hover": { borderColor: "#1976d2" },
                },
              }}
              className="w-full"
            />

            <TextField
              id="password"
              label="Password"
              variant="filled"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                input: { color: "white", border: "1px solid #6C7075" },
                label: { color: "#6C7075" },
                "& .MuiFilledInput-root": {
                  backgroundColor: "transparent",
                  borderRadius: "4px",
                  border: "1px solid #6C7075",
                  "&:hover": { borderColor: "#1976d2" },
                },
              }}
              className="w-full"
            />
            <LogPass />
            <div className="w-full flex justify-start">
              <h4 className="text-[#6C7075]">
                Don't have an account?
                <span
                  onClick={ToSignUp}
                  className="hover:underline cursor-pointer text-[#1976d2]"
                >
                  Sign up
                </span>
              </h4>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default LogIn;
