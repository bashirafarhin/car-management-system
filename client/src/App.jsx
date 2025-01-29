import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RootLayout from "./pages/RootLayout";
import UserProtectedWrapper from "./wrapper/UserProtectedWrapper";
import Home from './components/Home.jsx'
import ProductForm from "./components/ProductForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<RootLayout />}>
        <Route
          index
          element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
          }
        />
        <Route
          path='add-product'
          element={
            <UserProtectedWrapper>
              <ProductForm />
            </UserProtectedWrapper>
          }
        />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
