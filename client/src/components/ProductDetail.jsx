import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";
import { ProductContext } from "../context/ProductContext";
import axios from "axios";
import CustomAlert from "./utils/CustomAlert";
import Slider from "react-slick";

// Import Slick Carousel CSS globally in index.js or App.js
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductDetail = () => {
  const { id } = useParams();
  const { products, setProducts } = useContext(ProductContext);
  const product = products.find((product) => product._id.toString() === id);
  const [alert, setAlert] = useState({ open: false, color: "", msg: "" });
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/product/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setAlert({ open: true, color: "success", msg: "Product deleted successfully!" });
      setTimeout(() => {
        const updatedProducts = products.filter((p) => p._id !== id);
        setAlert({ open: false, color: "", msg: "" });
        setProducts(updatedProducts);
        navigate("/home/products");
      }, 2000);
    } catch (err) {
      console.log("Error during deletion", err);
      setAlert({ open: true, color: "error", msg: err.response.data.message });
      setTimeout(() => {
        setAlert({ open: false, color: "", msg: "" });
      }, 3000);
    }
  };

  // Slider settings for full-width images
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <>
      {/* Image Slider */}
      <Box sx={{ width: "100%", mb: 4, backgroundColor: 'blue' }}>
        <Slider {...settings}>
          {product?.images?.map((img, index) => (
            <div key={index}>
              <img
                src={img}
                alt={`Product Image ${index + 1}`}
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>
          ))}
        </Slider>
      </Box>

      {/* Product Details */}
      <Box sx={{ maxWidth: "900px", margin: "0 auto", padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          {product?.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {product?.description}
        </Typography>
        <Typography variant="body2" color="text.primary" fontWeight="bold" gutterBottom>
          {product?.company} | {product?.carType}
        </Typography>
        
        {/* Update and Delete Buttons */}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/home/products/edit/${id}`)}
          >
            Update Product
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleDelete}
          >
            Delete Product
          </Button>
        </Box>
      </Box>

      {/* Alert */}
      {alert.open && <CustomAlert color={alert.color} msg={alert.msg} />}
    </>
  );
};

export default ProductDetail;
