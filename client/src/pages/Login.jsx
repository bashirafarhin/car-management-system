import React, { useContext, useState } from "react";
import { TextField, Button, Box, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import CustomAlert from '../components/utils/CustomAlert'

const Login = () => {
  const { setUserDetails } = useContext(UserContext);
  const [alert, setAlert] = useState({ open: false, color: "", msg: "" });
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, credentials, {
        headers: { "Content-Type": "application/json" },
      });
      localStorage.setItem("authToken", res.data.token);
      setUserDetails({ username: res.data.username, email: res.data.email });
      navigate("/home");
    } catch (err) {
      setAlert({ open: true, color: "error", msg: err.response.data.message});
      setTimeout(() => {
        setAlert({ open: false, color: "", msg: "" });
      }, 3000);

    }
  };

  return (
    <>
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 5,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={credentials.email}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={credentials.password}
          onChange={handleChange}
          required
          sx={{ mb: 3 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          SIGN IN
        </Button>
      </form>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Typography>Don't have an account?</Typography>
        <Link href="/register" underline="none" sx={{ ml: 1, fontWeight: "bold", color: "primary.main" }}>
          Sign up
        </Link>
      </Box>
    </Box>
    {alert.open && <CustomAlert color={alert.color} msg={alert.msg} />}
    </>
  );
};

export default Login;
