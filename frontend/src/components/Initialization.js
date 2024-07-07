import React, { useState } from "react";
import { Button, Typography, CircularProgress } from "@mui/material";
import API from "../api";

const Initialization = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const initializeDatabase = async () => {
    setLoading(true);
    try {
      const response = await API.get("/product/initialize-seed-data");
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error initializing database");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Initialize Database
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={initializeDatabase}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Initialize"}
      </Button>
      {message && (
        <Typography variant="body1" color="textSecondary" gutterBottom>
          {message}
        </Typography>
      )}
    </div>
  );
};

export default Initialization;
