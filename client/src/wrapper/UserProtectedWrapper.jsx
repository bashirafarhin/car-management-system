import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import Loader from "../components/utils/Loader";

const UserProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { setUserDetails } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (token) {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/auth/profile`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
            });
          setUserDetails({
            username: response.data.username,
            email : response.data.email,
          });
          // console.log(response.data);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  return (
    <>
      {children}
      {loading && <Loader />}
    </>
  );
};

export default UserProtectedWrapper;