import { useDate } from "@/app/common/hooks/zustand/MonthZustand";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function MonthSelector() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const selectedMonth = useDate((state) => state.selectedMonth);
  const setSelectedMonth = useDate((state) => state.setSelectedMonth);

  return (
    <>
      <div className="w-[200px]">
        <FormControl fullWidth>
          <InputLabel sx={{ color: "#6C7075" }}>Month</InputLabel>
          <Select
            required
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
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
            {months.map((month, key) => (
              <MenuItem key={key} value={key + 1}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </>
  );
}

export default MonthSelector;
