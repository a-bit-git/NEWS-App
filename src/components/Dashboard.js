import React, { useState, useEffect } from 'react';
import Cards from './Cards';

function Dashboard() {
  const [newslist, setNewslist] = useState([]);
  const [category, setCategory] = useState('business'); // Set initial category to 'business'
  const [error, setError] = useState(null); // State to track errors

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value.toLowerCase(); // Get the selected category from the dropdown
    setCategory(newCategory); // Set the new category
  };

  const fetchData = async (category) => {
    try {
      setNewslist([]); // Clear the current newslist
      const response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=da74144b0a4f42b5b871e5db39bfcbce`);
      const data = await response.json();
      if (response.ok) {
        setNewslist(data.articles);
      } else {
        throw new Error(data.message || 'Failed to fetch news');
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message); // Set error message to state
    }
  };

  useEffect(() => {
    fetchData(category); // Fetch data on initial render and whenever the category changes
  }, [category]); // Re-run the effect when the category changes

  return (
    <>
      <div className="filter">
        <div>
          <select className="category-selector" onChange={handleCategoryChange} value={category}>
            <option value="business">Business</option>
            <option value="entertainment">Entertainment</option>
            <option value="health">Health</option>
            <option value="science">Science</option>
            <option value="sports">Sports</option>
            <option value="technology">Technology</option>
          </select>
        </div>
      </div>
      <div className="dashboard">
        {error && <p>Error: {error}</p>} {/* Display error message */}
        {newslist
          .filter(article => article.urlToImage)
          .map((article) => (
            <Cards 
              key={article.url} // Use article.url instead of article.source.id for unique keys
              title={article.title}
              urlToImage={article.urlToImage}
              name={article.source.name}
              publishedAt={article.publishedAt}
              url={article.url}
            />
          ))}
      </div>
    </>
  );
}

export default Dashboard;
