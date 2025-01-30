import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import SearchProduct from "./SearchProduct";
import { useNavigate } from "react-router-dom";
import car from '/car.svg'

const Header = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" onClick={()=>navigate('/home')} sx={{ flexGrow: 1, cursor: 'pointer' }}>
          Car Management App
        </Typography>
        <Box component="img" src={car} width="45px" height="45px" color="white" alt="Car Logo" onClick={()=>navigate('/home/products/add')} sx={{ mr : 2, cursor: 'pointer' }}/>
        <SearchProduct/>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
