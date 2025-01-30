import React, { useContext, useState } from "react";
import { TextField, Button, MenuItem, Box, Typography } from "@mui/material";
import axios from "axios";
import { ProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import CustomAlert from "./utils/CustomAlert";
const carTypes = ["Sedan", "SUV", "Hatchback", "Convertible", "Coupe", "Truck", "Van"];

const ProductForm = () => {
  const { setProducts } = useContext(ProductContext);
  const [alert, setAlert] = useState({ open: false, color: "", msg: "" });
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: [],
    carType: "",
    company: "",
    dealer: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImagesChange = (e) => {
    const imagesArray = e.target.value.split(",").map((url) => url.trim());
    setFormData({ ...formData, images: imagesArray });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/product/create`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });
      setAlert({ open: true, color: "success", msg: "Product Added successfully!" });
     setTimeout(() => {
      setAlert({ open: false, color: "", msg: "" });
      setProducts((prev) => {
        return [ ...prev, response.data.product]
      })
      navigate(`/home/products`);
    }, 2000);
    } catch (err) {
      console.error("Error adding note:", err);
      setAlert({ open: true, color: "error", msg: err.response.data.message});
      setTimeout(() => {
        setAlert({ open: false, color: "", msg: "" });
      }, 3000);
    }
  };

  return (
    <>
    <Box className="product-form" sx={{ maxWidth: 500, mx: "auto", mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        Create a New Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Images (comma-separated URLs)"
          name="images"
          value={formData.images.join(", ")}
          onChange={handleImagesChange}
          sx={{ mb: 2 }}
        />

        <TextField
          select
          fullWidth
          label="Car Type"
          name="carType"
          value={formData.carType}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        >
          {carTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          label="Company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Dealer"
          name="dealer"
          value={formData.dealer}
          onChange={handleChange}
          required
          sx={{ mb: 3 }}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create Product
        </Button>
      </form>
    </Box>
    {alert.open && <CustomAlert color={alert.color} msg={alert.msg} />}
    </>
  );
};

export default ProductForm;
