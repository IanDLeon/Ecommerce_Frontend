import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import InsightsIcon from "@mui/icons-material/Insights";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar } from "@mui/material";
import logo from "./../../../assets/commerce.png";
import { useContext } from "react";
import UserContext from "./../../../context/UserContext";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";

const drawerWidth = 250;

export default function Sidebar() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate()
  const handleLogout = () => {
    logout();
    navigate("/");
  }
  if(user.user && user?.user?.role !== 'admin') {
    return <Navigate to="/" />
  }
  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box display="flex" justifyContent="center" mx="auto" my={2}>
          <Avatar m="auto">
            <img src={logo} alt="logo" height="40px" width="40px" />
          </Avatar>
        </Box>
        <Divider />
        <List>
          <ListItem key={"products"} disablePadding>
            <ListItemButton component={Link} to="/admin">
              <ListItemIcon>
                <ProductionQuantityLimitsIcon />
              </ListItemIcon>
              <ListItemText primary={"Products"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"new-products"} disablePadding>
            <ListItemButton component={Link} to="/admin/add-product">
              <ListItemIcon>
                <ProductionQuantityLimitsIcon />
              </ListItemIcon>
              <ListItemText primary={"Create Products"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"orders"} disablePadding>
            <ListItemButton component={Link} to="/admin/orders">
              <ListItemIcon>
                <InsightsIcon />
              </ListItemIcon>
              <ListItemText primary={"Orders"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"users"} disablePadding>
            <ListItemButton component={Link} to="/admin/users">
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary={"Users"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem key={"logout"} disablePadding>
            <ListItemButton component="button" onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Outlet />
    </Box>
  );
}
