import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { ProductCard } from "./ProductCard";
import http from "../../http";

export default function Products() {
  const [products, setProducts] = useState([]);
  const getProducts = () => {
    http.get("/product/query", {
      params: {
        limit: 10,
        sortBy: "createdAt:desc"
      }
    }).then((res) => {
      setProducts(res.data.results);
    })
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <Box component="main" p={4}>
      <Grid
        container
        spacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        direction="row"
        justifyContent="center"
      >
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
