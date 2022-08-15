import { Box, Button, Divider, Typography } from "@mui/material";
import {
  Elements,
  ElementsConsumer,
  CardElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useContext } from "react";
import CartContext from "../../context/CartContext";
import http from "../../http";
import Review from "./Review";

const stripePromise = loadStripe(
  "pk_test_51LVab1FhCV4Fl70Rb4tyD9slXC8nynL4Uhw7AJi3Ci4CwEQOnbbP773TCeXfx9H073mQ7t19rxhZB6PTM4PMId8K00kvwvKFe4"
);

export default function Payment({
  nextStep,
  previousStep,
  shippingData,
  handleOrderStatus,
}) {
  const { cart, clearCartItems } = useContext(CartContext);
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const response = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: shippingData.name,
        email: shippingData.email,
        phone: shippingData.contactNo
      }
    });

    console.log(response);

    if (response.error) {
      console.log("[error]", response.error);
    } else {
      const data = {
        ...shippingData,
        price: +cart.reduce(
          (acc, item) => acc + Number(item.price) * item.quantity,
          0
        ),
        products: cart.map(_p => ({product: _p.id, quantity: _p.quantity}))
      }
      console.log(data)

      try {
        const res = await http.post("/order/place", data)
        console.log("[success]", res)
        handleOrderStatus("success");
        clearCartItems();
        nextStep();
      } catch (error) {
        console.log("[error]", error);
      }
    }
  };

  return (
    <>
      <Review />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment method
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br /> <br />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="outlined" onClick={previousStep}>
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!stripe}
                  color="primary"
                >
                  Pay{" "}
                  {`$ ${cart.reduce(
                    (acc, item) => acc + Number(item.price) * item.quantity,
                    0
                  )}`}
                </Button>
              </Box>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
}
