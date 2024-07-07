import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
  "& .MuiInputBase-input": {
    color: "white",
  },
  "& .MuiInputLabel-root": {
    color: "white",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "white",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
  },
  "& .MuiOutlinedInput-input::placeholder": {
    color: "white",
  },
});

const StyledButton = styled(Button)({
  backgroundColor: "#ff9800",
  "&:hover": {
    backgroundColor: "#e68900",
  },
});

const SearchForm = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");
  const [month, setMonth] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    await onSearch(searchText, month);
    setLoading(false);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <StyledTextField
        label="Search Product"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        variant="outlined"
        size="small"
        placeholder="Search Text"
        sx={{ bgcolor: "transparent", borderRadius: 1 }}
      />
      <StyledTextField
        label="Month"
        select
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        variant="outlined"
        size="small"
        placeholder="Select Month"
        sx={{ bgcolor: "transparent", borderRadius: 1, minWidth: 150 }}
      >
        {[
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
        ].map((month) => (
          <MenuItem key={month} value={month}>
            {month}
          </MenuItem>
        ))}
      </StyledTextField>
      <StyledButton
        variant="contained"
        onClick={handleSearch}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Search"}
      </StyledButton>
    </Box>
  );
};

export default SearchForm;
