import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import SearchProduct from "./SearchProduct";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Car Management App
        </Typography>
        <SearchProduct/>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
