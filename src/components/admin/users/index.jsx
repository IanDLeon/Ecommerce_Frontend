import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import http from "../../../http";
import { Box, Typography } from "@mui/material";

export default function Users() {
  const [users, setUsers] = useState([]);
  const getUsers = () => {
    http
      .get("/users")
      .then((response) => setUsers(response.data.results))
      .catch((error) => console.error(error));
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 2 },
    { field: "email", headerName: "Email", flex: 1 },
  ];

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Box display="flex" flexDirection="column" width="100%">
      <Typography
        variant="h3"
        component="h1"
        color="text.secondary"
        textAlign="center"
        pt={2}
      >
        Users
      </Typography>
      <Box width="auto" p={2} minWidth="785px" overflow="auto">
        <DataGrid
          rows={users}
          columns={columns}
          autoHeight
          pageSize={10}
          rowsPerPageOptions={[5, 10, 15, 20]}
        />
      </Box>
    </Box>
  );
}
