import React, { useState } from "react";
import { Container, Typography, Box, Paper, Grid } from "@mui/material";
import SearchForm from "./components/SearchForm";
import Transactions from "./components/Transactions";
import Statistics from "./components/Statistics";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import CombinedData from "./components/CombinedData";

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [month, setMonth] = useState("");

  const handleSearch = (searchText, month) => {
    setSearchText(searchText);
    setMonth(month);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h2" gutterBottom sx={{ textAlign: "center", mb: 4 }}>
        Product Transactions Dashboard
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <SearchForm onSearch={handleSearch} />
      </Box>
      <Paper elevation={3} sx={{ padding: 2, borderRadius: "8px", mb: 4 }}>
        <Transactions searchText={searchText} month={month} />
      </Paper>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Statistics month={month} />
            </Grid>
            <Grid item>
              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  borderRadius: "8px",
                  height: "calc(100% - 150px - 16px)",
                }}
              >
                <BarChart month={month} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{ padding: 2, borderRadius: "8px", height: "500px" }}
          >
            <PieChart month={month} />
          </Paper>
        </Grid>
      </Grid>
      <CombinedData month={month} />
    </Container>
  );
};

export default App;
