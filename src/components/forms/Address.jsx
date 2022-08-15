import {
  Box,
  Button,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import UserContext from "../../context/UserContext";

export default function Address({ handleShippingData }) {
  const {user: {user}} = useContext(UserContext);
  const [shippingData, setShippingData] = useState({
    name: user.name ?? "",
    contactNo: "",
    email: user.email ?? "",
    address: "",
    city: "",
    country: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleShippingData(shippingData);
  };

  return (
    <>
      <Typography variant="h4" component="h2" gutterBottom>
        Shipping Address
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                label="Name"
                fullWidth
                required
                value={shippingData.name}
                onChange={(e) =>
                  setShippingData({
                    ...shippingData,
                    name: e.target.value,
                  })
                }
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="contactNo"
                label="Contact No."
                fullWidth
                required
                variant="standard"
                value={shippingData.contactNo}
                onChange={(e) =>
                  setShippingData({ ...shippingData, contactNo: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="email"
                label="Email"
                fullWidth
                required
                variant="standard"
                inputProps={{ type: "email" }}
                value={shippingData.email}
                onChange={(e) =>
                  setShippingData({ ...shippingData, email: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="address"
                label="Address"
                fullWidth
                required
                variant="standard"
                multiline
                maxRows={3}
                inputProps={{ maxLength: 80 }}
                value={shippingData.address}
                onChange={(e) =>
                  setShippingData({ ...shippingData, address: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="city"
                label="City"
                fullWidth
                required
                variant="standard"
                value={shippingData.city}
                onChange={(e) =>
                  setShippingData({ ...shippingData, city: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="country"
                label="Country"
                fullWidth
                required
                variant="standard"
                value={shippingData.country}
                onChange={(e) =>
                  setShippingData({ ...shippingData, country: e.target.value })
                }
              />
            </Grid>
          </Grid>
          <br />

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              component={Link}
              variant="contained"
              to="/cart"
              color="primary"
              size="large"
              startIcon={<ArrowBackIosIcon />}
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              endIcon={<ArrowForwardIosIcon />}
            >
              Next
            </Button>
          </Box>
        </FormGroup>
      </form>
    </>
  );
}
