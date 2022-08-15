import {
  Button,
  FormGroup,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router";
import http from "../../../http";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [files, setFiles] = useState()

  const navigate = useNavigate()

  const addProduct = async (e) => {
    e.preventDefault()
    const body = {
      title: name,
      description,
      price,
      quantity
    };
    const formData = new FormData();
    formData.append("image", files[0]);
    const images = await http.post("/product/images", formData);
    body.images = images.data
    http
      .post("/product", body)
      .then(() => {
        navigate("/admin")
      })
      .catch((error) => console.error(error));
  };
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
        component="form"
        onSubmit={addProduct}
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
              type="number"
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
          <Box m={2}>
            <TextField
              name="quantity"
              label="Quantity"
              value={quantity}
              type="number"
              fullWidth
              required
              onChange={(e) => setQuantity(+e.target.value)}
            />
          </Box>
          <label>Product Image
            <input type="file" name="image" required accept="image/png, image/jpeg" onChange={e => setFiles(e.target.files)} />
          </label>
          <Box m={2} ml="auto">
            <Button variant="contained" size="large" type="submit">
              Add
            </Button>
          </Box>
        </FormGroup>
      </Box>
    </>
  );
}
