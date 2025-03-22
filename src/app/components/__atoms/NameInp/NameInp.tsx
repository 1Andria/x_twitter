import { NameInpProps } from "@/app/common/Types/Common";
import { TextField } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";

function SignInp<T extends FieldValues>({
  register,
  errors,
  regName,
  label,
  type,
}: NameInpProps<T>) {
  return (
    <div className="flex flex-col gap-[3px]">
      <TextField
        id={String(regName)}
        label={label}
        variant="outlined"
        type={type}
        error={!!errors[regName]}
        {...register(regName)}
        sx={{
          input: { color: "white", border: "1px" },
          label: { color: "#6C7075" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#6C7075" },
            "&:hover fieldset": { borderColor: "#1976d2" },
            "&.Mui-error fieldset": { borderColor: "#FC4747" },
          },
        }}
      />
      {errors[regName] && (
        <span className="text-[#FC4747] text-[12px]">
          {errors[regName]?.message as string}
        </span>
      )}
    </div>
  );
}

export default SignInp;
