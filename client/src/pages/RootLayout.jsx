import React from "react";
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const RootLayout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: "100vh",
      }}
    >
      <Header />
      <Box
        sx={{
          flex: 1, // Allow the main content to take up available space
          overflowY: 'auto', // Make the content scrollable if it exceeds the height
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default RootLayout;
