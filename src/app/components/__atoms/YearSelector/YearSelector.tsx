import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useDate } from "@/app/common/hooks/zustand/MonthZustand";

function YearSelector() {
  const years = Array.from(
    { length: 2025 - 1905 + 1 },
    (_, i) => 1905 + i
  ).reverse();
  const selectedYear = useDate((state) => state.selectedYear);
  const setSelectedYear = useDate((state) => state.setSelectedYear);

  return (
    <div className="w-[130px]">
      <FormControl fullWidth>
        <InputLabel sx={{ color: "#6C7075" }}>Year</InputLabel>
        <Select
          required
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          label="Month"
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
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default YearSelector;
