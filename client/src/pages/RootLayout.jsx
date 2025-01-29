import React from "react";
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";
import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";

const RootLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <Header />

      {/* Scrollable Content Area */}
      <Container
        sx={{
          flex: 1,
          overflowY: "auto", // Allow vertical scrolling
          py: 2,
          "&::-webkit-scrollbar": {
            width: "8px", // Scrollbar width
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f0f0f0", // Track color
            borderRadius: "10px", // Rounded corners
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#1976d2", // Thumb color
            borderRadius: "10px", // Rounded corners
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#1259a7", // Thumb color on hover
          },
          // Firefox styles for custom scrollbar
          scrollbarWidth: "thin",
          scrollbarColor: "#1976d2 #f0f0f0", // Thumb and track colors for Firefox
        }}
      >
        <Outlet />
      </Container>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default RootLayout;
