import React, { useContext, useState, useEffect } from 'react'
import { ProductContext } from '../context/ProductContext'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import Loader from './Loader/Loader'
import axios from 'axios'

const Home = () => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { products, setProducts } = useContext(ProductContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/product`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        });
        console.log(response);
        setProducts(response.data.products);
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    products.length==0 ? fetchProducts() : setLoading(false);
  }, []);

  return (
    <>
    <div>Home</div>
    <Button onClick={()=>{navigate('add-product')}}>Add</Button>
    { isLoading ? <Loader/> : <div className='products-container'>{products}</div> }
    </>
  )
}

export default Home