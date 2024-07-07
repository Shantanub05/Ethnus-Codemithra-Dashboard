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

const Transactions = ({ searchText, month }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
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
      <Typography variant="h4" gutterBottom>
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
            sx={{ mt: 2, borderRadius: "8px", boxShadow: 3 }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Sold</TableCell>
                  <TableCell>Date of Sale</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.id}</TableCell>
                    <TableCell>{transaction.title}</TableCell>
                    <TableCell>{transaction.price}</TableCell>
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
