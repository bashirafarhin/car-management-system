import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Typography, Card, CardContent } from "@mui/material";
import { ProductContext } from "../context/ProductContext";
import axios from "axios"
import CustomAlert from "./utils/CustomAlert";

const ProductDetail = () => {
  const { id } = useParams();
  const { products, setProducts } = useContext(ProductContext);
  const product = products.find((product) => product._id.toString() === id);
  const [alert, setAlert] = useState({ open: false, color: "", msg: "" });
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/product/${id}`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
    });
      setAlert({ open: true, color: "success", msg: "Product deleted successfully!"});
      setTimeout(() => {
      const updatedProducts = products.filter((p) => p._id !== id);
      setAlert({ open: false, color: "", msg: "" });
      setProducts(updatedProducts);
      navigate("/home/products");
    }, 2000);

    } catch (err) {
      console.log("error deleting",err);
    }
  };

  return (
    <>
    <Card sx={{ maxWidth: 500, margin: "20px auto" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {product?.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product?.description}
        </Typography>
        <Typography variant="body2" color="text.primary" fontWeight="bold">
          {product?.company} | {product?.carType}
        </Typography>

        <div style={{ marginTop: "20px" }}>
          <Button variant="contained" color="primary" onClick={()=>{navigate(`/home/products/edit/${id}`)}}>
            Update Product
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleDelete}
            style={{ marginLeft: "10px" }}
          >
            Delete Product
          </Button>
        </div>
      </CardContent>
    </Card>
    {alert.open && <CustomAlert color={alert.color} msg={alert.msg} />}
    </>
  );
};

export default ProductDetail;
