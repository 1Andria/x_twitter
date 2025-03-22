import { useLogIn } from "@/app/common/hooks/zustand/CreateAccState";
import XIcon from "@/app/common/icons/xIcon";
import { Box, Modal, TextField } from "@mui/material";
import React from "react";
import RegisterBtn from "../../__atoms/RegisterBtn/RegisterBtn";
import Google from "@/app/common/icons/Google";
import { OpenGoogle } from "@/app/common/functions/OpnGglAcc";
import Apple from "@/app/common/icons/Apple";
import { OpenApple } from "@/app/common/functions/OpnAplAcc";

function LogIn() {
  const openLogIn = useLogIn((state) => state.openLogIn);
  const setOpenLogIn = useLogIn((state) => state.setOpenLogIn);
  return (
    <>
      <Modal
        open={openLogIn}
        onClose={() => setOpenLogIn(false)}
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
            //   onSubmit={handleSubmit(onSubmit)}
            className="w-[470px] ml-[10px] mr-[10px] h-[640px] rounded-[20px] pr-[65px] pl-[65px] bg-black flex flex-col pt-[15px] pb-[40px] relative items-center"
          >
            <div
              onClick={() => setOpenLogIn(false)}
              className=" rounded-[50%] cursor-pointer hover:bg-[#4E5050] w-[25px] h-[25px] flex justify-center  items-center absolute top-[20px] left-[20px]"
            >
              <h1 className=" text-white">X</h1>
            </div>
            <div className="w-full flex justify-center ">
              <div className="w-[30px] h-[30px]">
                <XIcon />
              </div>
            </div>
            <div className="w-full flex justify-start">
              <h1 className="text-white  text-[30px] font-semibold">
                Sign in to X
              </h1>
            </div>
            <RegisterBtn
              btnColor="bg-white"
              btnTxt="sign up with google"
              btnIcon={<Google />}
              btnFont="font-normal"
              onClick={OpenGoogle}
            />
            <RegisterBtn
              btnColor="bg-white"
              btnTxt="Sign up with Apple"
              btnIcon={<Apple />}
              btnFont="font-semibold"
              onClick={OpenApple}
            />
            <div className="flex items-center gap-[10px] w-full">
              <div className="w-full h-[1px] bg-[#2F3336]"></div>
              <h4 className="text-[#DBDDDE]">or</h4>
              <div className="w-full h-[1px] bg-[#2F3336]"></div>
            </div>
            <TextField
              id="filled-basic"
              label="Email"
              variant="filled"
              className="w-full"
              sx={{
                input: { color: "white", border: "1px solid #6C7075" },
                label: { color: "#6C7075" },
                "& .MuiFilledInput-root": {
                  backgroundColor: "transparent",
                  borderRadius: "4px",
                  border: "1px solid #6C7075",
                  "&:hover": {
                    borderColor: "#1976d2",
                  },
                  "&.Mui-error": {
                    borderColor: "#FC4747",
                  },
                },
              }}
            />
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default LogIn;
