import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import React, { useContext } from "react";
import CartContext from "../../context/CartContext";

export const CartItem = ({ product }) => {
  const { increaseProductQuantity, decreaseProductQuantity, removeCartItem } =
    useContext(CartContext);
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
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            {`$${product.price}`}
          </Typography>
        </Box>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <ButtonGroup>
          <IconButton
            disabled={product.quantity <= 0}
            onClick={() => decreaseProductQuantity(product.id)}
          >
            <RemoveIcon />
          </IconButton>
          <Typography
            variant="h5"
            component="p"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center" }}
          >
            &nbsp;{product.quantity > 0 ? product.quantity : 0}&nbsp;
          </Typography>
          <IconButton onClick={() => increaseProductQuantity(product.id)}>
            <AddIcon />
          </IconButton>
        </ButtonGroup>
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => removeCartItem(product.id)}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
