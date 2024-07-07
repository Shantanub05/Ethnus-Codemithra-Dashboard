import React, { useState, useEffect } from "react";
import { Typography, CircularProgress, Box, Paper } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import API from "../api";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({ month }) => {
  const [barData, setBarData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchBarChart = async () => {
    setLoading(true);
    try {
      const response = await API.get("/analytics/bar-chart", {
        params: { month: month || undefined },
      });
      setBarData(response.data.data.priceRangeCounts);
    } catch (error) {
      console.error("Error fetching bar chart data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBarChart();
  }, [month]);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Bar Chart
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        barData && (
          <Box sx={{ mt: 2 }}>
            <Bar
              data={{
                labels: barData.map((item) => item.range),
                datasets: [
                  {
                    label: "Number of Items",
                    data: barData.map((item) => item.count),
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
          </Box>
        )
      )}
    </>
  );
};

export default BarChart;
