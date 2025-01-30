import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        py: 2,
        textAlign: "center",
        bgcolor: "primary.main",
        color: "white",
        mt: "auto",
      }}
    >
      <Typography variant="body2">
        Copyright © {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Footer;
