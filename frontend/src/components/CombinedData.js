import React, { useState, useEffect } from "react";
import { Typography, CircularProgress, Box, Paper, Grid } from "@mui/material";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import API from "../api";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

const CombinedData = ({ month }) => {
  const [combinedData, setCombinedData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCombinedData = async () => {
    setLoading(true);
    try {
      const response = await API.get("/analytics/combined-chart", {
        params: { month: month || undefined },
      });
      setCombinedData(response.data.data);
    } catch (error) {
      console.error("Error fetching combined data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCombinedData();
  }, [month]);

  return (
    <Paper elevation={3} sx={{ padding: 2, borderRadius: "8px", mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Combined Data
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        combinedData && (
          <Box sx={{ mt: 2 }}>
            <Paper
              elevation={3}
              sx={{ padding: 2, borderRadius: "8px", mb: 4 }}
            >
              <Typography variant="h6" gutterBottom>
                Transactions
              </Typography>
              {combinedData.transactions.map((transaction) => (
                <Box key={transaction.id} sx={{ mb: 1 }}>
                  <Typography variant="body1">
                    {transaction.title} - ${transaction.price}
                  </Typography>
                </Box>
              ))}
            </Paper>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      padding: 2,
                      borderRadius: "8px",
                      mb: 2,
                      height: "150px",
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      Statistics
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Total Sale Amount: $
                      {combinedData.statistics.totalSaleAmount}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Sold Items Count: {combinedData.statistics.soldItemsCount}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Not Sold Items Count:{" "}
                      {combinedData.statistics.notSoldItemsCount}
                    </Typography>
                  </Paper>
                  <Paper
                    elevation={3}
                    sx={{ padding: 2, borderRadius: "8px", flexGrow: 1 }}
                  >
                    <Typography variant="h6" gutterBottom>
                      Bar Chart
                    </Typography>
                    <Bar
                      data={{
                        labels: combinedData.barChart.map((item) => item.range),
                        datasets: [
                          {
                            label: "Number of Items",
                            data: combinedData.barChart.map(
                              (item) => item.count
                            ),
                            backgroundColor: "rgba(75,192,192,1)",
                          },
                        ],
                      }}
                      options={{
                        scales: {
                          y: { beginAtZero: true },
                        },
                      }}
                    />
                  </Paper>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={3}
                 sx={{ height: "100%", display: "flex", flexDirection: "column" }}
                >
                  <Typography variant="h6" gutterBottom paddingLeft={2}>
                    Pie Chart
                  </Typography>
                  <Box
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Pie
                      data={{
                        labels: Object.keys(combinedData.pieChart),
                        datasets: [
                          {
                            label: "Number of Items",
                            data: Object.values(combinedData.pieChart),
                            backgroundColor: [
                              "rgba(255,99,132,1)",
                              "rgba(54,162,235,1)",
                              "rgba(255,206,86,1)",
                              "rgba(75,192,192,1)",
                              "rgba(153,102,255,1)",
                              "rgba(255,159,64,1)",
                            ],
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                      }}
                    />
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )
      )}
    </Paper>
  );
};

export default CombinedData;
