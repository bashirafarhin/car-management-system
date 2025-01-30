import React, { useContext, useState } from "react";
import { TextField, Button, MenuItem, Box, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CustomAlert from './utils/CustomAlert'
import { ProductContext } from "../context/ProductContext";

const carTypes = ["Sedan", "SUV", "Hatchback", "Convertible", "Coupe", "Truck", "Van"];

const ProductUpdate = () => {
  const { id } = useParams();
  const { products, setProducts } = useContext(ProductContext);
  const product = products.find((product) => product._id === id);
  const [alert, setAlert] = useState({ open: false, color: "", msg: "" });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: product?.title,
    description: product?.description,
    images: [],
    carType: product?.carType,
    company: product?.company,
    dealer: product?.dealer,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImagesChange = (e) => {
    const imagesArray = e.target.value.split(",").map((url) => url.trim());
    setFormData({ ...formData, images: imagesArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/product/update/${id}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });
      setAlert({ open: true, color: "success", msg: "Product updated successfully!"});
      setTimeout(() => {
      setAlert({ open: false, color: "", msg: "" });
      setProducts((prev) => {
        return prev.map((product) =>
          product._id === res.data.product._id ? res.data.product : product
        );
      });
      navigate(`/home/products/${id}`);
    }, 2000);
    } catch (error) {
      console.error("Update error:", error);
      setErrors(error.response?.data?.errors || { submit: "Failed to update product" });
    }
  };

  if (errors.fetch) return <p className="text-red-500">{errors.fetch}</p>;

  return (
    <>
    <Box className="product-form" sx={{ maxWidth: 500, mx: "auto", mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        Update Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={!!errors.title}
          helperText={errors.title || ""}
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
          error={!!errors.description}
          helperText={errors.description || ""}
          required
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Images (comma-separated URLs)"
          name="images"
          value={formData.images.join(", ")}
          onChange={handleImagesChange}
          error={!!errors.images}
          helperText={errors.images || "Enter image URLs separated by commas"}
          sx={{ mb: 2 }}
        />

        <TextField
          select
          fullWidth
          label="Car Type"
          name="carType"
          value={formData.carType}
          onChange={handleChange}
          error={!!errors.carType}
          helperText={errors.carType || ""}
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
          error={!!errors.company}
          helperText={errors.company || ""}
          required
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Dealer"
          name="dealer"
          value={formData.dealer}
          onChange={handleChange}
          error={!!errors.dealer}
          helperText={errors.dealer || ""}
          required
          sx={{ mb: 3 }}
        />

        {errors.submit && <Typography color="error">{errors.submit}</Typography>}

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Update Product
        </Button>
      </form>
    </Box>
    {alert.open && <CustomAlert color={alert.color} msg={alert.msg} />}
    </>
  );
};

export default ProductUpdate;
