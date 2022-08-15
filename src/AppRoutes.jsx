import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./components/products/Products";
import Navbar from "./components/navbar";
import Cart from "./components/cart/Cart";
import Checkout from "./components/forms/Checkout";
import PageNotFound from "./components/pageNotFound";
import Product from "./components/products/Product";
import SignIn from "./components/forms/SignIn";
import SignUp from "./components/forms/SignUp";
import Sidebar from "./components/admin/sidebar";
import ProductsList from "./components/admin/products/ProductsList";
import AddProduct from "./components/admin/products/AddProduct";
import EditProduct from "./components/admin/products/EditProduct";
import Users from "./components/admin/users";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/:slug" element={<Product />} />
        <Route exact path="/" element={<Products />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/checkout" element={<Checkout />} />
        <Route exact path="/login" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<Sidebar />}>
          <Route index element={<ProductsList />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="edit-product" element={<EditProduct />} />
          <Route path="users" element={<Users />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
