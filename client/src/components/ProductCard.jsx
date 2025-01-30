import React from 'react';
import { Card, CardContent, Typography, CardMedia, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {

  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={product.images && product.images.length > 0 ? product.images[0] : '/placeholder.jpg'}
        alt={product.title}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description.slice(0, 100)}...
        </Typography>
        <Typography variant="body2" color="text.primary" fontWeight="bold">
          {product.company} | {product.carType}
        </Typography>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={() => navigate(`${product._id}`)} // Passing product ID to navigate
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
