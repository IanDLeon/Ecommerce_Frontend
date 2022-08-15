import React, { useContext } from "react";
import { Container } from "@mui/system";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import CartContext from "../../context/CartContext";

export default function Cart() {
  const { cart, clearCartItems } = useContext(CartContext);
  const subTotal = cart.reduce(
    (acc, product) => acc + Number(product.price) * product.quantity,
    0
  );

  return (
    <Container>
      <Typography variant="h4" component="h2" p={2} gutterBottom>
        Your Shopping Cart
      </Typography>
      {cart.length >= 1 ? (
        <Box>
          <Grid
            container
            spacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
            p={2}
            direction="row"
            justifyContent="center"
          >
            {cart.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                <CartItem product={item} />
              </Grid>
            ))}
          </Grid>
          <Stack p={2} direction="row" justifyContent="space-between">
            <Typography variant="h4" component="p">
              Subtotal: ${subTotal}
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                component={Link}
                to="/checkout"
                variant="contained"
                color="primary"
              >
                Checkout
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={clearCartItems}
                sx={{ marginRight: "10px" }}
              >
                Clear Cart
              </Button>
            </Stack>
          </Stack>
        </Box>
      ) : (
        <Typography variant="h6" component="p">
          {`You have no items in your shopping cart, `}
          <Button component={Link} to="/" size="small" variant="contained">
            start adding some
          </Button>
        </Typography>
      )}
    </Container>
  );
}
