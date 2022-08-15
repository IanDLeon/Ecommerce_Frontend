import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function PageNotFound() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
    >
      <Typography variant="h1" color="text.secondary">
        404, Page Not Found !
      </Typography>
    </Box>
  );
}
