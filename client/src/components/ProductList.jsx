import React, { useContext  } from 'react'
import { ProductContext } from '../context/ProductContext'
import { useNavigate } from 'react-router-dom'
import { Button, Typography, Grid } from '@mui/material'
import ProductCard from './ProductCard'

const ProductList = () => {
    const { products, productError } = useContext(ProductContext);
    const navigate = useNavigate();

  return (
    <>
    <Button variant="contained" onClick={() => navigate('add')}>Add Product</Button>
    {productError && <Typography color="error" variant="body1" sx={{ mt: 2 }}>{productError}</Typography>}
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
  </>
  )
}

export default ProductList