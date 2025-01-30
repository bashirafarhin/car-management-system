import "./App.css";
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import UserProtectedWrapper from "./wrapper/UserProtectedWrapper";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Home = lazy(() => import("./components/Home"));
const ProductList = lazy(() => import("./components/ProductList"));
const ProductForm = lazy(() => import("./components/ProductForm"));
const ProductDetail = lazy(() => import("./components/ProductDetail"));
const ProductUpdate = lazy(() => import("./components/ProductUpdate"));
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <BrowserRouter>
     {/* <Suspense fallback={<div>Loading...</div>}> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<UserProtectedWrapper><RootLayout /></UserProtectedWrapper>}>
        <Route index element={<Home />} />
        <Route path="products">
          <Route index element={<ProductList />} />
          <Route path="add" element={<ProductForm />} />
          <Route path=":id" element={<ProductDetail />} />
          <Route path="edit/:id" element={<ProductUpdate />} />
        </Route>
        </Route>
      </Routes>
      {/* </Suspense> */}
    </BrowserRouter>
  );
}

export default App;
