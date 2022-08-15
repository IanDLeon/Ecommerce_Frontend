import { CssBaseline } from "@mui/material";
import "./App.css";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";
import AppRoutes from "./AppRoutes";
import { Box } from "@mui/system";

function App() {
  return (
    <>
      <CssBaseline />
      <Box height="100vh" backgroundColor="#fafafa">
        <UserProvider>
          <CartProvider>
            <AppRoutes />;
          </CartProvider>
        </UserProvider>
      </Box>
    </>
  );
}

export default App;
