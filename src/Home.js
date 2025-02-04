import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook
import axios from 'axios';
import './App.css'; // Import the CSS file
import { PornContext } from './PornContext';

const Home = () => {
  const{
    setSelectedCategory
  }=useContext(PornContext);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Hook to navigate to other pages

  // Function to fetch data from the Pornhub Categories API
  const fetchData = async () => {
    const options = {
      method: 'GET',
      url: 'https://pornhub-api1.p.rapidapi.com/categories_list/en',
      headers: {
        'x-rapidapi-key': 'cb6eff14f1mshf2f6b4d6a3eb602p127547jsnd3ff44ebaba2',
        'x-rapidapi-host': 'pornhub-api1.p.rapidapi.com',
      },
    };

    try {
      // Make the API request
      const response = await axios.request(options);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data.');
      setLoading(false);
    }
  };

  // Use effect to trigger the API call on mount
  useEffect(() => {
    fetchData();
     // eslint-disable-next-line
  }, []); 

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  // Filter out categories where "is_gay" is true
  const filteredCategories = data && data.flat().filter((category) => !category.is_gay);

  // Handle category click to set selected category and navigate to PornPage
  const handleCategoryClick = (categoryTitle) => {
    setSelectedCategory(categoryTitle);  // Set the category title to state
    navigate('/video');  // Navigate to the PornPage
  };

  return (
    <div className="app-container">
      <h1 className="heading">Pornhub Categories</h1>
      <div className="categories-container">
        {/* Check if filtered categories exist, then display the list */}
        {filteredCategories && filteredCategories.length > 0 ? (
          <div className="categories-flex">
            {/* Map over the filtered categories */}
            {filteredCategories.map((category, index) => (
              <div
                className="category-card"
                key={index}
                onClick={() => handleCategoryClick(category.title)} // On click, set the title in state and navigate
              >
                <h3 className="category-title">{category.title}</h3>
                {/* Display the thumbnail image */}
                {category.thumbnail ? (
                  <img
                    src={category.thumbnail}
                    alt={category.title}
                    className="category-thumbnail"
                  />
                ) : (
                  <p>No thumbnail available</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No categories found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
