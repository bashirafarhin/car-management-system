import { createContext, useState, useEffect } from "react";
export const ProductContext = createContext();
import Loader from '../components/utils/Loader'
import axios from 'axios';

export const ProductContextProvider = ({children}) => {
    const [ products, setProducts ] = useState([]);
    const [ productError, setProductError] = useState(null);
    const [ isLoading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/product`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            });
            console.log('product context success');
            setProducts(response.data.products);
          } catch (err) {
            console.log('prod context error')
            setProductError(err.message);
          } finally {
            setLoading(false);
          }
        };
        fetchProducts();
      }, []);

    return (
        <ProductContext.Provider value={{ products, setProducts, productError, setProductError }}>
            { isLoading ? <Loader /> : children}
        </ProductContext.Provider>
    )
}