import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  AppBar,
  Toolbar,
  CssBaseline,
} from "@mui/material";
import SearchForm from "./components/SearchForm";
import Transactions from "./components/Transactions";
import Statistics from "./components/Statistics";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import CombinedData from "./components/CombinedData";

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [month, setMonth] = useState("");
  const [page, setPage] = useState(1); // Add page state here

  const handleSearch = (searchText, month) => {
    setSearchText(searchText);
    setMonth(month);
    setPage(1); // Reset page to 1 on new search
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        position="sticky"
        sx={{ mb: 4, bgcolor: "#1c313a", height: 80, justifyContent: "center" }}
      >
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1, color: "#fff" }}>
            Product Transactions Dashboard
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <SearchForm onSearch={handleSearch} />
          </Box>
        </Toolbar>
      </AppBar>
      <Container>
        {month ? (
          <>
            <Paper
              elevation={3}
              sx={{ padding: 2, borderRadius: "8px", mb: 4, bgcolor: "#e3f2fd" }} 
            >
              <Transactions searchText={searchText} month={month} page={page} setPage={setPage} />
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
          </>
        ) : (
          <Paper elevation={3} sx={{ padding: 2, borderRadius: "8px", mb: 4, bgcolor: "#e3f2fd" }}>
            <Transactions searchText={searchText} month={month} page={page} setPage={setPage} />
          </Paper>
        )}
      </Container>
    </>
  );
};

export default App;