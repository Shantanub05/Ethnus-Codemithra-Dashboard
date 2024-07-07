import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
  Paper,
} from "@mui/material";

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
    <Paper elevation={3} sx={{ padding: 2, borderRadius: "8px" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <TextField
          label="Search Text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Month"
          select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          variant="outlined"
          fullWidth
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
        </TextField>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Search"}
        </Button>
      </Box>
    </Paper>
  );
};

export default SearchForm;
