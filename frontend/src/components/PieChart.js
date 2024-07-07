import React, { useState, useEffect } from "react";
import { Typography, CircularProgress, Box } from "@mui/material";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import API from "../api";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ month }) => {
  const [pieData, setPieData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPieChart = async () => {
    setLoading(true);
    try {
      const response = await API.get("/analytics/pie-chart", {
        params: { month: month || undefined },
      });
      setPieData(response.data.data);
    } catch (error) {
      console.error("Error fetching pie chart data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPieChart();
  }, [month]);

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Typography variant="h4" gutterBottom>
        Pie Chart
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexGrow: 1 }}>
          <CircularProgress />
        </Box>
      ) : (
        pieData && (
          <Box sx={{ flexGrow: 1, position: "relative" }}>
            <Pie
              data={{
                labels: Object.keys(pieData),
                datasets: [
                  {
                    label: "Number of Items",
                    data: Object.values(pieData),
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
        )
      )}
    </Box>
  );
};

export default PieChart;