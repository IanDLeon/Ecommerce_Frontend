import React, { useState } from "react";
import { Box } from "@mui/system";
import { Paper, Step, StepLabel, Stepper, Typography } from "@mui/material";
import Confirmation from "./Confirmation";
import Payment from "./Payment";
import Address from "./Address";

const steps = ["Shipping Address", "Billing Details"];

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const [paymentDetails, setPaymentDetails] = useState({});
  const [orderStatus, setOrderStatus] = useState("pending");

  const nextStep = () => setActiveStep(activeStep + 1);
  const previousStep = () => setActiveStep(activeStep - 1);

  const handleShippingData = (data) => {
    setShippingData(data);
    nextStep();
  };

  const handlePaymentDetails = (data) => {
    setPaymentDetails(data);
    nextStep();
  };

  const handleOrderStatus = (status) => {
    setOrderStatus(status);
  };

  return (
    <Box
      component="main"
      p={{
        xs: 0,
        sm: 0,
        md: 2,
        lg: 3,
      }}
      margin="auto"
      maxWidth={{ xs: "100%", sm: "100%", md: "50vw", lg: "50vw" }}
      minWidth="320px"
    >
      <Paper
        sx={{
          padding: { xs: 1, sm: 2, md: 3, lg: 3 },
          boxShadow: "0px 0px 5px 2px #88888896",
          borderRadius: "10px",
        }}
      >
        <Typography variant="h3" align="center">
          Checkout
        </Typography>

        <Stepper
          activeStep={activeStep}
          sx={{
            padding: { xs: 0, sm: 0, md: "0.5rem", lg: "1rem" },
            marginBottom: "1rem",
          }}
        >
          {steps.map((step) => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === steps.length ? (
          <Confirmation shippingData={shippingData} orderStatus={orderStatus} />
        ) : activeStep === 1 ? (
          <Payment
            handlePaymentDetails={handlePaymentDetails}
            nextStep={nextStep}
            previousStep={previousStep}
            shippingData={shippingData}
            handleOrderStatus={handleOrderStatus}
          />
        ) : (
          <Address handleShippingData={handleShippingData} />
        )}
      </Paper>
    </Box>
  );
}
