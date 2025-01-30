import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    }}>
      <Typography variant="h6" color="textSecondary">
        Here Admin Dashboard Will Come
      </Typography>
      <Button
        sx={{ mt: 2 }}
        variant="contained"
        onClick={() => navigate("products")}
      >
        Browse Your Products
      </Button>
    </Box>
  );
};

export default Home;
