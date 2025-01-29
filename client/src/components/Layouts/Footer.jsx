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
        bgcolor: "primary.main", // MUI primary color
        color: "white",
        mt: "auto", // Pushes footer to the bottom
        // position: 'absolute',
        // bottom: 0,
      }}
    >
      <Typography variant="body2">
        Copyright © {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Footer;
