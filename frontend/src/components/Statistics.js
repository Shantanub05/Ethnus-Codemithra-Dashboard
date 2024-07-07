import React, { useState, useEffect } from "react";
import { Typography, CircularProgress, Box, Paper } from "@mui/material";
import API from "../api";

const Statistics = ({ month }) => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchStatistics = async () => {
    setLoading(true);
    try {
      const response = await API.get("/analytics/statistics", {
        params: { month: month || undefined },
      });
      setStatistics(response.data.data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, [month]);

  return (
    <Paper elevation={3} sx={{ padding: 2, borderRadius: "8px", height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" gutterBottom>
        Statistics
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexGrow: 1 }}>
          <CircularProgress />
        </Box>
      ) : (
        statistics && (
          <Box sx={{ mt: 2, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="body1" gutterBottom>
              Total Sale Amount: ${statistics.totalSaleAmount}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Sold Items Count: {statistics.soldItemsCount}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Not Sold Items Count: {statistics.notSoldItemsCount}
            </Typography>
          </Box>
        )
      )}
    </Paper>
  );
};

export default Statistics;