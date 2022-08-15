import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function Confirmation({ shippingData, orderStatus }) {
  return orderStatus === "success" ? (
    <>
      <Typography variant="h5">
        Thank you for your purchase, {shippingData.firstName}{" "}
        {shippingData.lastName}!
      </Typography>
      <Box my={4}>
        <Divider variant="middle" />
      </Box>
      <Button component={Link} variant="contained" color="primary" to="/">
        Back to home
      </Button>
    </>
  ) : (
    <Box display="flex" justifyContent="center" alignItems="center">
      <CircularProgress />
    </Box>
  );
}
