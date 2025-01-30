import React, { useContext, useState } from "react";
import { TextField, Button, Box, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import CustomAlert from "../components/utils/CustomAlert";
import axios from "axios";

const Register = () => {
  const [alert, setAlert] = useState({ open: false, color: "", msg: "" });
  const { setUserDetails } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, formData, {
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
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          type="email"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          sx={{ mb: 3 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          SIGN UP
        </Button>
      </form>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Typography>Already a member?</Typography>
        <Link href="/" underline="none" sx={{ ml: 1, fontWeight: "bold", color: "primary.main" }}>
          Sign in
        </Link>
      </Box>
    </Box>
    {alert.open && <CustomAlert color={alert.color} msg={alert.msg} />}
    </>
  );
};

export default Register;
