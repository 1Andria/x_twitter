import {
  useElementColor,
  useMoreModal,
  useThemeColors,
} from "@/app/common/hooks/Store";
import CheckIcon from "@/app/common/icons/CheckIcon";
import { Box, Modal } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

function MoreModal() {
  const out = useMoreModal((state) => state.out);
  const setOut = useMoreModal((state) => state.setOut);
  const themeColor = useThemeColors((state) => state.themeColor);
  const setThemeColor = useThemeColors((state) => state.setThemeColor);
  const contentColor = useThemeColors((state) => state.contentColor);
  const setContentColor = useThemeColors((state) => state.setContentColor);
  const elementColor = useElementColor((state) => state.elementColor);
  const setElementColor = useElementColor((state) => state.setElementColor);
  const router = useRouter();
  const ThemeArray = ["Light", "Dim", "Default"];

  const ElementColorArray = [
    "#1D9BF0",
    "#FFD400",
    "#F91880",
    "#7856FF",
    "#FF7A00",
    "#00BA7C",
  ];

  if (themeColor === "Default") {
    setContentColor("black");
  } else if (themeColor === "Dim") {
    setContentColor("#15202B");
  } else if (themeColor === "Light") {
    setContentColor("white");
  }

  function CloseModal() {
    setOut(false);
  }

  function HandleLogOut() {
    router.push("/");
  }

  return (
    <>
      <Modal
        open={out}
        onClose={CloseModal}
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
          <div
            className={`w-[570px] max-[630px]:w-[350px] max-[630px]:pr-[30px] max-[630px]:pl-[30px]  ml-[10px] mr-[10px] h-[640px] rounded-[20px] pr-[65px] pl-[65px] bg-[${contentColor}] flex flex-col pt-[15px] pb-[80px] relative items-center `}
          >
            <button
              onClick={HandleLogOut}
              className=" w-[150px] text-[red] border border-white bg-black rounded-[20px] h-[50px]  flex justify-center items-center"
            >
              Log out
            </button>
            <h2
              className={`font-bold text-[20px] mt-[20px] mb-[20px] ${
                contentColor === "white" ? "text-black" : "text-white"
              }`}
            >
              Background:
            </h2>
            <div className="w-full flex gap-[10px] justify-between ">
              {ThemeArray.map((item) => (
                <button
                  key={item}
                  onClick={() => setThemeColor(item)}
                  className={`w-full ${
                    item === "Light" ? "bg-white text-[black]" : ""
                  } ${item === "Dim" ? "bg-[#15202B]" : " "} ${
                    item === "Default" ? "bg-[black]" : " "
                  } ${
                    themeColor === item
                      ? "border-[4px] border-[#1D9BF0]"
                      : "border-[0px]"
                  } font-bold h-[50px] rounded-[10px] text-white`}
                >
                  {item}
                </button>
              ))}
            </div>
            <h2
              className={`font-bold text-[20px] mt-[20px] mb-[20px] ${
                contentColor === "white" ? "text-black" : "text-white"
              }`}
            >
              Element colors:
            </h2>
            <div className="w-full  flex gap-[8px] justify-between">
              {ElementColorArray.map((item) => (
                <div
                  key={item}
                  onClick={() => setElementColor(item)}
                  className={`cursor-pointer bg-[${item}] h-[30px] w-[30px] rounded-[100%] flex items-center justify-center`}
                >
                  <div
                    className={`${
                      elementColor === item ? "flex" : "hidden"
                    } w-[20px] h-[20px] `}
                  >
                    <CheckIcon />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default MoreModal;
