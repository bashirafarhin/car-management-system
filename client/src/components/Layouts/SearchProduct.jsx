import React, { useState } from "react";
import { IconButton, TextField, InputAdornment, Box, List, ListItem, ListItemText, Paper } from "@mui/material";
import { Search, Close } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";

const SearchProduct = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const fetchSuggestions = async (input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/product/get-suggestions`, {
        params: { input },
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });
      setSuggestions(response.data.products);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  // Debounced function to optimize API calls
  const debouncedFetch = debounce(fetchSuggestions, 300);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedFetch(value);
  };

  const handleSelectProduct = (id) => {
    navigate(`/home/products/${id}`);
    setQuery("");
    setSuggestions([]);
    setSearchOpen(false);
  };

  return (
    <Box sx={{ position: "relative" }}>
      {/* Search Icon (opens input field) */}
      {!searchOpen && (
        <IconButton onClick={() => setSearchOpen(true)} color="inherit">
          <Search />
        </IconButton>
      )}

      {/* Search Input Field */}
      {searchOpen && (
        <TextField
          autoFocus
          fullWidth
          variant="outlined"
          size="small"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search products..."
          sx={{ backgroundColor: "white", borderRadius: 1, width: "250px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => { setSearchOpen(false); setQuery(""); setSuggestions([]); }}>
                  <Close />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}

      {/* Search Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <Paper sx={{ position: "absolute", top: "100%", left: 0, right: 0, zIndex: 10, mt: 1, maxHeight: 200, overflowY: "auto" }}>
          <List>
            {suggestions.map((product) => (
              <ListItem key={product._id} button onClick={() => handleSelectProduct(product._id)}>
                <ListItemText primary={product.title} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default SearchProduct;
