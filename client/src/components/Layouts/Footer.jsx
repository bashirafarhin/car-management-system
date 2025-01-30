import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        py: 2,
        textAlign: "center",
        bgcolor: "primary.main",
        color: "white",
        marginTop: 'auto',
      }}
    >
      <Typography variant="body2">
        Copyright © {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Footer;
