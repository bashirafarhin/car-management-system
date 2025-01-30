import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Grid, Box } from "@mui/material";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const { products, productError } = useContext(ProductContext);
  const navigate = useNavigate();

  return (
    <>
      {productError && (
        <Typography color="error" variant="body1" sx={{ mt: 2 }}>
          {productError}
        </Typography>
      )}
      {products.length === 0 ? (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography variant="h6" color="textSecondary">
            You have no products.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("add")}
            sx={{ mt: 2 }}
          >
            Add Your First Product
          </Button>
        </Box>
      ) : (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default ProductList;
