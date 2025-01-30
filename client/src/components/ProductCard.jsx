// // import React from 'react';
// // import { Card, CardContent, Typography, CardMedia, Button } from '@mui/material';
// // import { useNavigate } from 'react-router-dom';

// // const ProductCard = ({ product }) => {

// //   const navigate = useNavigate();

// //   return (
// //     <Card sx={{ maxWidth: 345, margin: 2 }}>
// //       <CardMedia
// //         component="img"
// //         height="140"
// //         image={product.images && product.images.length > 0 ? product.images[0] : '/placeholder.jpg'}
// //         alt={product.title}
// //       />
// //       <CardContent>
// //         <Typography variant="h5" component="div">
// //           {product.title}
// //         </Typography>
// //         <Typography variant="body2" color="text.secondary">
// //           {product.description.slice(0, 100)}...
// //         </Typography>
// //         <Typography variant="body2" color="text.primary" fontWeight="bold">
// //           {product.company} | {product.carType}
// //         </Typography>
// //         <Button
// //           size="small"
// //           variant="contained"
// //           color="primary"
// //           onClick={() => navigate(`${product._id}`)} // Passing product ID to navigate
// //         >
// //           View Details
// //         </Button>
// //       </CardContent>
// //     </Card>
// //   );
// // };

// // export default ProductCard;
// import React from "react";
// import { Card, CardContent, Typography, Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import Slider from "react-slick";

// const ProductCard = ({ product }) => {
//   const navigate = useNavigate();

//   // Slider settings
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: true,
//   };

//   return (
//     <Card sx={{ maxWidth: 345, margin: 2 }}>
//         <Slider {...settings}>
//           {product.images.map((img, index) => (
//             <div key={index}>
//               <img
//                 src={img}
//                 alt={`Product Image ${index + 1}`}
//                 style={{
//                   // width: "100%",
//                   // height: "200px",
//                   objectFit: "cover",
//                   borderRadius: "8px",
//                 }}
//               />
//             </div>
//           ))}
//         </Slider>
//       <CardContent>
//         <Typography variant="h5" component="div">
//           {product.title}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {product.description.slice(0, 100)}...
//         </Typography>
//         <Typography variant="body2" color="text.primary" fontWeight="bold">
//           {product.company} | {product.carType}
//         </Typography>
//         <Button
//           size="small"
//           variant="contained"
//           color="primary"
//           onClick={() => navigate(`${product._id}`)}
//         >
//           View Details
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };

// export default ProductCard;
import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  console.log(product);

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      {/* Ensure the slider container has a fixed height */}
      <div style={{ width: "100%", height: "200px", overflow: "hidden" }}>
        <Slider {...settings}>
          {product.images && product.images.length > 0 ? (
            product.images.map((img, index) => (
              <div key={index}>
                <img
                  src={img}
                  alt={`Product Image ${index + 1}`}
                  style={{
                    width: "100%", // Ensure full width
                    height: "200px", // Maintain consistent height
                    objectFit: "cover", // Crop to fit
                    borderRadius: "8px",
                  }}
                />
              </div>
            ))
          ) : (
            <img
              src="/placeholder.jpg"
              alt="Placeholder"
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
              }}
            />
          )}
        </Slider>
      </div>

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
          onClick={() => navigate(`${product._id}`)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
