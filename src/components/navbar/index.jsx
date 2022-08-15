import React, { useContext } from "react";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import CartContext from "../../context/CartContext";
import logo from "../../assets/commerce.png";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate()

  const handleLogout = () => {
    logout();
    navigate("/")
  }
  const handleSearch = (e) => {
    console.log("Search Input", e.target.value);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#069DDD" }}>
      <Grid container alignItems="center">
        <Grid
          item
          xs={12}
          sm={4}
          md={4}
          lg={4}
          pb={{ xs: 1, sm: 1, md: 0, lg: 0 }}
        >
          <Toolbar>
            <Link to="/">
              <Box display="flex">
                <Box
                  component="img"
                  sx={{
                    height: "30px",
                  }}
                  src={logo}
                  alt="ECommerce App Logo"
                />
                <Typography
                  variant="h6"
                  component="h1"
                  color="white"
                  ml={1}
                  fontWeight="bold"
                >
                  Commerce
                </Typography>
              </Box>
            </Link>
          </Toolbar>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          md={4}
          lg={4}
          pb={{ xs: 1, sm: 1, md: 0, lg: 0 }}
        >
          <Paper m={3}>
            <IconButton sx={{ p: "10px" }} aria-label="search" disabled>
              <SearchIcon sx={{ color: "black" }} />
            </IconButton>
            <InputBase
              sx={{ ml: 1 }}
              placeholder="Search Products"
              inputProps={{ "aria-label": "search" }}
              onInput={handleSearch}
            />
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          md={4}
          lg={4}
          sx={{
            display: "flex",
            justifyContent: {
              sm: "flex-end",
              md: "flex-end",
              lg: "flex-end",
              xl: "flex-end",
            },
          }}
          pb={{ xs: 1, sm: 1, md: 0, lg: 0 }}
        >
          {
            !user.isLoggedIn ? (
              <Button sx={{color: "white"}} component={Link} to="/login">Login</Button>
            ) : (
              <IconButton sx={{ marginRight: "24px", color: "white", display: "flex", gap: 2 }} size="md" onClick={handleLogout}>
                {user.user.name} <LogoutIcon sx={{ color: "white" }} />
              </IconButton>
            )
          }
          <IconButton
            component={Link}
            to="/cart"
            sx={{ marginRight: "24px" }}
            size="md"
            disabled={cart.length === 0 || !user.isLoggedIn}
          >
            <Badge badgeContent={cart.length} color="error">
              <ShoppingCart sx={{ color: "white" }} />
            </Badge>
          </IconButton>
        </Grid>
      </Grid>
    </AppBar>
  );
}
