import React, { useState } from "react";
import { TextField, Button, MenuItem, Box, Typography } from "@mui/material";
import axios from "axios";

const carTypes = ["Sedan", "SUV", "Hatchback", "Convertible", "Coupe", "Truck", "Van"];

const ProductForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: [],
    carType: "",
    company: "",
    dealer: "",
  });

  const [errors, setErrors] = useState({});
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
    setErrors({});
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/product/create`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });
      console.log("Product Created:", response);
    } catch (error) {
      console.error("Error:", error.response.data);
      setErrors(error.response.data.errors || {});
    }
  };

  return (
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

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create Product
        </Button>
      </form>
    </Box>
  );
};

export default ProductForm;
