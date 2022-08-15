import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import http from "../../../http";
import { Box, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const getProducts = () => {
    http
      .get("/product/query?limit=1000&sortBy=createdAt:desc&isActive=true")
      .then((response) => setProducts(response.data.results))
      .catch((error) => console.error(error));
  };

  const handleDeleteProduct = (id) => {
    http
      .delete(`/product/${id}`)
      .then(() => getProducts())
      .catch((error) => console.error(error));
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "title", headerName: "Name", flex: 2 },
    { field: "price", headerName: "Price", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" justifyContent="space-evenly" width="100%">
          <IconButton
            component={Link}
            to="/admin/edit-product"
            state={{
              product: params.row,
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteProduct(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Box display="flex" flexDirection="column" width="100%">
        <Typography
          variant="h3"
          component="h1"
          color="text.secondary"
          textAlign="center"
          pt={2}
        >
          Products
        </Typography>
        <Box p={2} minWidth="785px" width="100%" overflow="auto">
          <DataGrid
            rows={products}
            columns={columns}
            autoHeight
            pageSize={10}
            rowsPerPageOptions={[5, 10, 15, 20]}
          />
        </Box>
      </Box>
    </>
  );
}
