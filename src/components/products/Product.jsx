import { useContext, useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CartContext from "../../context/CartContext";
import { useLocation } from 'react-router-dom'

export default function Product() {
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const {product} = location.state;
  return (
    <Box
      m={3}
      p={3}
      sx={{
        boxShadow: "0px 0px 5px 2px #88888896",
        borderRadius: "10px",
      }}
    >
      <Grid container spacing={{ xs: 1, sm: 1, md: 2, lg: 3 }}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <img src={product?.images[0]} alt={`${product.title}`} width="100%" />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h3" component="h2">
              {product.title}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              fontSize="1.15rem"
              my={1}
            >
              {product.description}
            </Typography>
            <Typography variant="h4" component="h3" textAlign="right" mb={2}>
              {`$${product.price}`}
            </Typography>
            <Divider />
            <Box display="flex" justifyContent="space-evenly" fullWidth my={4}>
              <ButtonGroup size="large">
                <IconButton
                  disabled={quantity <= 0}
                  onClick={() => setQuantity(quantity - 1)}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography
                  variant="h5"
                  component="p"
                  color="text.secondary"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  &nbsp;{quantity}&nbsp;
                </Typography>
                <IconButton onClick={() => setQuantity(quantity + 1)}>
                  <AddIcon />
                </IconButton>
              </ButtonGroup>
              <Button
                variant="contained"
                color="primary"
                size="large"
                disabled={quantity <= 0}
                endIcon={<AddShoppingCart sx={{ color: "" }} />}
                onClick={() => addToCart(product, quantity)}
              >
                Add to Cart
              </Button>
            </Box>
            <Divider />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
