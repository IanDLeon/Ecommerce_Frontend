import React, { useContext } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Box,
  CardActions,
  IconButton,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import CartContext from "./../../context/CartContext";
import { Link } from "react-router-dom";

export const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  
  return (
    <Card
      sx={{
        maxWidth: "100%",
        boxShadow: "0px 0px 5px 2px #88888896",
        borderRadius: "10px",
      }}
    >
      <CardMedia
        component="img"
        height="150"
        width="150"
        image={product.images[0]}
        alt={`${product.title} Photo`}
        sx={{
          objectFit: "fill",
        }}
      />
      <CardContent component={Link} to={`/${product.slug || product.id}`} state={{
        product: product
      }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 1,
          }}
          px={1}
        >
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            fontSize="1.5rem"
            fontWeight="400"
            color="text.primary"
          >
            {product.title}
          </Typography>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            color="text.primary"
          >
            {`$${product.price}`}
          </Typography>
        </Box>
        <Typography variant="subtitle1" color="text.secondary" px={1}>
          {product.description}
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <IconButton
          aria-label="Add to Cart"
          onClick={() => addToCart(product, 1)}
        >
          <AddShoppingCart sx={{ color: "#FF8319" }} />
        </IconButton>
      </CardActions>
    </Card>
  );
};
