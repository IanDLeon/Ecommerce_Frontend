import {
  Box,
  Button,
  FormGroup,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import http from "../../../http";

export default function EditProduct() {
  const location = useLocation();
  const { product } = location.state;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();

  const navigate = useNavigate()
  const editProduct = () => {
    const body = {
      title: name,
      description,
      price,
    };
    http
      .patch("/product/" + product.id, body)
      .then(() => {
        navigate("/admin")
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    setName(product.title);
    setDescription(product.description);
    setPrice(product.price);
    console.log(product);
  }, [product]);
  return (
    <>
      <Typography
        variant="h3"
        component="h1"
        color="text.secondary"
        textAlign="center"
        pt={2}
      >
        Add Product
      </Typography>
      <Box
        sx={{
          margin: "2rem 4rem",
          padding: "2rem 4rem",
          maxWidth: "100%",
          boxShadow: "0px 0px 5px 2px #88888896",
          borderRadius: "10px",
        }}
      >
        <FormGroup m={4}>
          <Box m={2}>
            <TextField
              name="name"
              label="Name"
              value={name}
              placeholder="Product Name"
              fullWidth
              required
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <Box m={2}>
            <TextField
              name="description"
              label="Description"
              value={description}
              placeholder="Product Description"
              fullWidth
              required
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>
          <Box m={2}>
            <TextField
              name="price"
              label="Price"
              value={price}
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
                type: "number",
              }}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Box>
          <Box m={2} ml="auto">
            <Button variant="contained" size="large" onClick={editProduct}>
              Update
            </Button>
          </Box>
        </FormGroup>
      </Box>
    </>
  );
}
