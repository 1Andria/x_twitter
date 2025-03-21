import XIcon from "@/app/common/icons/xIcon";
import { SignUpSchema } from "@/app/common/schemas/SignUpSchema";
import { Box, Modal } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SignInp from "../../__atoms/NameInp/NameInp";
import MonthSelector from "../../__atoms/MonthSelector/MonthSelector";
import DaySeletor from "../../__atoms/DaySelector/DaySeletor";
import YearSelector from "../../__atoms/YearSelector/YearSelector";
import NextBtnSign from "../../__atoms/NextBtnSign/NextBtnSign";
import PasswordSign from "../PasswordSign/PasswordSign";
import { SignUpForm } from "@/app/common/Types/Common";
import { useCreateAcc, useDate, useRegistrationSteps } from "@/app/common/hooks/Store";

function CreateAcc() {
  const open = useCreateAcc((state) => state.open);
  const setOpen = useCreateAcc((state) => state.setOpen);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    getValues,
  } = useForm<SignUpForm>({
    resolver: yupResolver(SignUpSchema),
  });

  const onSubmit = (data: SignUpForm) => {
    ToPasswordLevel();
  };

  const name = watch("name");
  const email = watch("email");
  const resetDate = useDate((state) => state.resetDate);
  function onClose() {
    reset();
    resetDate();
    setOpen(false);
  }

  const firstLevel = useRegistrationSteps((state) => state.firstLevel);
  const passwordLevel = useRegistrationSteps((state) => state.passwordLevel);
  const ToPasswordLevel = useRegistrationSteps(
    (state) => state.setToPasswordLevel
  );

  return (
    <Modal
      open={open}
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
        {firstLevel && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-[570px] w-full ml-[10px] mr-[10px] h-[640px] rounded-[20px] pr-[60px] pl-[60px] bg-black flex justify-between flex-col pt-[15px] pb-[40px] relative"
          >
            <div
              onClick={onClose}
              className=" rounded-[50%] cursor-pointer hover:bg-[#4E5050] w-[25px] h-[25px] flex justify-center items-center absolute top-[20px] left-[20px]"
            >
              <h1 className=" text-white">X</h1>
            </div>
            <div className="w-full flex justify-center ">
              <div className="w-[30px] h-[30px]">
                <XIcon />
              </div>
            </div>
            <h2 className="text-white text-[30px] font-semibold">
              Create your account
            </h2>
            <SignInp
              register={register}
              errors={errors}
              regName="name"
              label="Name"
              type="text"
            />
            <SignInp
              register={register}
              errors={errors}
              regName="email"
              label="email"
              type="email"
            />
            <div className="flex flex-col">
              <h4 className="text-white font-semibold text-[14px]">
                Date of birth
              </h4>
              <p className="text-[#6C7075] text-[13px]">
                This will not be shown publicly. Confirm your own age, even if
                this account is for a business, a pet, or something else.
              </p>
            </div>
            <div className="flex w-full justify-between">
              <MonthSelector />
              <DaySeletor />
              <YearSelector />
            </div>
            <NextBtnSign name={name} email={email} />
          </form>
        )}
        {passwordLevel && (
          <PasswordSign
            onClose={onClose}
            email={getValues("email")}
            name={getValues("name")}
          />
        )}
      </Box>
    </Modal>
  );
}

export default CreateAcc;
