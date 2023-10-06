import React, { useState, useEffect } from 'react';

function ZipCodeInfo() {
  const [zipCode, setZipCode] = useState(''); // Default zip code
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const apiUrl = `https://ctp-zip-code-api.onrender.com/zip/${zipCode}`;

  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error('No results found');
        }

        const jsonData = await response.json();
        setData(jsonData);
        setError(null);
      } catch (err) {
        setError('Error fetching data');
        console.error(err);
      }
    };

    fetchData(); // Fetch data when the component mounts or when zipCode changes.

  }, [zipCode, apiUrl]);

  return (
    <div>
      <h2>Zip Code Information</h2>
      <input
        type="text"
        placeholder="Enter Zip Code"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
      />
      {error && <p>{error}</p>}
      <ul>
        {data.map((item) => (
          <li key={item.RecordNumber}>
            {item.City}, {item.State}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ZipCodeInfo;
