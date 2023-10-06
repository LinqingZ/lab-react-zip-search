import React, { useState } from "react";

function SearchBox({ onSearch }) {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchText) return;

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://ctp-zip-code-api.onrender.com/zip/${searchText}`
      );
      if (!response.ok) {
        throw new Error("No results found");
      }

      const data = await response.json();

      // Call the onSearch callback with the search results
      onSearch(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter ZIP code"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button onClick={handleSearch} disabled={isLoading}>
        {isLoading ? "Searching..." : "Search"}
      </button>
    </div>
  );
}

export default SearchBox;
