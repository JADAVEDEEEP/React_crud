import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SearchBar.css"; // Import the CSS file

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      if (!searchTerm.trim()) {
        // Handle empty search term, e.g., show an error message
        console.error("Search term cannot be empty");
        return;
      }

      // Make a request to the Roles API using Axios
      const response = await axios.get(
        `https://localhost:7014/api/Roles/RoleName${searchTerm}`
      );

      // Handle the response and update the state with search results
      const filteredData = response.data;

      // Redirect to a search results page or handle search logic here
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`, {
        state: { searchResults: filteredData },
      });
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
