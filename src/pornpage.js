import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './App.css'; // Import your CSS
import { PornContext } from './PornContext'; // Import the PornContext

const PornPage = () => {
  const { selectedCategory } = useContext(PornContext); // Get selectedCategory from context
  
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  // Function to fetch videos based on the selected category
  const fetchVideos = async () => {
    if (!selectedCategory) {
      setError('No category selected.');
      return;
    }

    setLoading(true);
    setError(null);

    const options = {
      method: 'GET',
      url: 'https://pornhub-video-download-api-search-stars-tags-categories.p.rapidapi.com/get_videos_by_tags',
      params: {
        tags: selectedCategory, // Use selectedCategory directly from context
        page: page.toString(),
      },
      headers: {
        'x-rapidapi-key': '75cc271786mshe38a96fe2b116d8p11b8cfjsn11411815e9bf', // Replace with your own API key
        'x-rapidapi-host': 'pornhub-video-download-api-search-stars-tags-categories.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      setVideos(response.data);
      setLoading(false);
    } catch (error) {
      setError('An error occurred while fetching videos.');
      setLoading(false);
    }
  };

  // Fetch videos when the component mounts or when selectedCategory/page changes
  useEffect(() => {
    if (selectedCategory) {
      fetchVideos();
    }
     // eslint-disable-next-line
  }, [selectedCategory, page]); // Re-fetch when category or page changes

  // Format rating to whole number (rounded)
  const formatRating = (rating) => {
    return `${Math.round(Math.min(Math.max(rating, 0), 100))}%`; // Round rating to the nearest whole number
  };

  // Format views (e.g., 1M for million, 1K for thousand)
  const formatViews = (views) => {
    if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + 'M';
    } else if (views >= 1000) {
      return (views / 1000).toFixed(1) + 'K';
    } else {
      return views;
    }
  };

  // Handle page change (for pagination)
  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="app-container">
      <h1 className="heading">Videos for Category: {selectedCategory}</h1>

      {loading && <div className="loading">Loading videos...</div>}
      {error && <div className="error">{error}</div>}

      {videos.length > 0 ? (
        <div className="videos-container">
          {videos.map((video, index) => (
            <a href={video.url} target="_blank" rel="noopener noreferrer" key={index} className="video-card" style={{textDecoration:'none'}}>
              <div className="video-card-inner">
                <h3 className="video-title">{video.title}</h3>
                <img
                  src={video.thumb}
                  alt={video.title}
                  className="video-thumbnail"
                />
                <div className="video-info">
                  <span className="video-duration">{video.duration}</span>
                  <span className="video-rating">{formatRating(video.rating)}</span>
                  <span className="video-views">{formatViews(video.views)}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <p>No videos found for the selected category.</p>
      )}

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default PornPage;
