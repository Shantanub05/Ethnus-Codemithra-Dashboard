import React, { useState, useEffect, useRef } from "react";
import {
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Box,
  Pagination,
} from "@mui/material";
import API from "../api";

const Transactions = ({ searchText, month, page, setPage }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const topRef = useRef(null);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await API.get("/product/search", {
        params: { searchText, month, page, perPage: 10 },
      });
      setTransactions(response.data.data.data);
      setTotalPages(response.data.data.pagination.pages);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [searchText, month, page]);

  const handlePageChange = (event, value) => {
    setPage(value);
    topRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box sx={{ mb: 4 }}>
      <div ref={topRef}></div>
      <Typography variant="h6" gutterBottom>
        Transactions
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer
            component={Paper}
            sx={{
              mt: 2,
              borderRadius: "8px",
              boxShadow: 3,
             
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Sold</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Date of Sale
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.id}</TableCell>
                    <TableCell>{transaction.title}</TableCell>
                    <TableCell>${transaction.price.toFixed(2)}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell>{transaction.sold ? "Yes" : "No"}</TableCell>
                    <TableCell>
                      {new Date(transaction.dateOfSale).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Transactions;
