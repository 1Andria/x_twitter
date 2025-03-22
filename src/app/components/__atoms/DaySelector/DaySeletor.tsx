import { useDate } from "@/app/common/hooks/Store";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

function DaySeletor() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const selectedDay = useDate((state) => state.selectedDay);
  const setSelectedDay = useDate((state) => state.setSelectedDay);
  return (
    <>
      <div className="w-[100px]">
        <FormControl fullWidth>
          <InputLabel sx={{ color: "#6C7075" }}>Day</InputLabel>
          <Select
            required
            value={selectedDay}
            onChange={(e) => setSelectedDay(Number(e.target.value))}
            label="Day"
            sx={{
              input: { color: "white" },
              color: "white",
              "& .MuiSelect-outlined": {
                color: "white",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#6C7075",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1976d2",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1976d2",
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: "black",
                  color: "white",
                  border: "0.5px solid #6C7075",
                },
              },
            }}
          >
            {days.map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        ;
      </div>
    </>
  );
}

export default DaySeletor;
