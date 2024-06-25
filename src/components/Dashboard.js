import React, { useState, useEffect } from 'react';
import Cards from './Cards';
import articles from './mocdata';

function Dashboard() {
  const [newslist, setNewslist] = useState(articles);
  const [category, setCategory] = useState('business');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 12;

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value.toLowerCase(); // Get the selected category from the dropdown clicked by user
    setCategory(newCategory); // Set the new category
    setCurrentPage(1); // Reset to the first page when the category changes
  };

  const fetchData = async (category) => {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=da74144b0a4f42b5b871e5db39bfcbce`);
    const data = await response.json();
    setNewslist(data?.articles);
  };

  useEffect(() => {
    fetchData(category); // Fetch data on initial render and whenever the category changes
  }, [category]); // Re-run the effect when the category changes

  // Calculate the articles to display based on the current page
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = newslist.slice(indexOfFirstArticle, indexOfLastArticle);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(newslist.length / articlesPerPage);

  return (
    <>
      <div className="filter">
        <select className="category-selector" onChange={handleCategoryChange} value={category}>
          <option value="business">Business</option>
          <option value="entertainment">Entertainment</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
        </select>
      </div>
      <div className="dashboard">
        {currentArticles
          .filter(article => article.urlToImage)
          .map((article, index) => (
            <Cards 
              key={article.source.id + index}
              title={article.title}
              urlToImage={article.urlToImage}
              name={article.source.name}
              publishedAt={article.publishedAt}
              url={article.url}
            />
          ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (K, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}>{index + 1}
          </button>
        ))}
      </div>
    </>
  );
}

export default Dashboard;
