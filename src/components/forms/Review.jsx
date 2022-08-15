import React, { useContext, useEffect, useState } from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import CartContext from "../../context/CartContext";

export default function Review() {
  const { cart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    setProducts(cart.filter((item) => item.quantity > 0));
    setTotalPrice(
      cart.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0)
    );
  }, [cart]);
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem style={{ padding: "10px 0" }} key={product.name}>
            <ListItemText
              primary={product.name}
              secondary={`Quantity: ${product.quantity}`}
            />
            <Typography variant="body2">
              {`$ ${product.price * product.quantity}`}
            </Typography>
          </ListItem>
        ))}
        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
            {`$ ${totalPrice}`}
          </Typography>
        </ListItem>
      </List>
    </>
  );
}
