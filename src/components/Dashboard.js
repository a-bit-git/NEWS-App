// import React, { useState, useEffect } from 'react';
// import Cards from './Cards';
// import articles from './mocdata'

// function Dashboard() {
//   const [newslist, setNewslist] = useState(articles);
//   const [category, setCategory] = useState('business'); // Set initial category to 'business'

//   const handleCategoryChange = (event) => {
//     const newCategory = event.target.value.toLowerCase(); // Get the selected category from the dropdown
//     setCategory(newCategory); // Set the new category
//   };

//   const fetchData = (category) => {
//     setTimeout(async ()=>{
//       const response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=da74144b0a4f42b5b871e5db39bfcbce`);
//       const data = await response.json();
//       setNewslist(data?.articles);
//     },500)
//   };

//   useEffect(() => {
//     fetchData(category); // Fetch data on initial render and whenever the category changes
//   }, [category]); // Re-run the effect when the category changes

//   return (
//     <>
//       <div className="filter">
        
//         <div>
//           <select className="category-selector" onChange={handleCategoryChange} value={category}>
//             <option value="business">Business</option>
//             <option value="entertainment">Entertainment</option>
//             <option value="health">Health</option>
//             <option value="science">Science</option>
//             <option value="sports">Sports</option>
//             <option value="technology">Technology</option>
//           </select>
//         </div>
//       </div>
//       <div className="dashboard">
//         {newslist
//           .filter(article => article.urlToImage)
//           .map((article) => (
//             <Cards 
//               key={article.source.id}
//               title={article.title}
//               urlToImage={article.urlToImage}
//               name={article.source.name}
//               publishedAt={article.publishedAt}
//               url={article.url}
//             />
//           ))}
//       </div>

      
//     </>
//   );
// }

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import Cards from './Cards';
import articles from './mocdata'

function Dashboard() {


  // const [newslist, setNewslist] = useState(articles);
  // const [category, setCategory] = useState('business'); // Set initial category to 'business'

  // const handleCategoryChange = (event) => {
  //   const newCategory = event.target.value.toLowerCase(); // Get the selected category from the dropdown
  //   setCategory(newCategory); // Set the new category
  // };

  // const fetchData = (category) => {
  //   setTimeout(async ()=>{
  //     const response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=da74144b0a4f42b5b871e5db39bfcbce`);
  //     const data = await response.json();
  //     setNewslist(data?.articles);
  //   },500)
  // };

  // useEffect(() => {
  //   fetchData(category); // Fetch data on initial render and whenever the category changes
  // }, [category]); // Re-run the effect when the category change


  const [newslist, setNewslist] = useState(articles);

  const fetchData = () => {
    setTimeout(async ()=>{
      const response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=da74144b0a4f42b5b871e5db39bfcbce`);
      const data = await response.json();
      setNewslist(data?.articles);
    },500)
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="filter">
        
        {/* <div>
          <select className="category-selector" onChange={handleCategoryChange} value={category}>
            <option value="business">Business</option>
            <option value="entertainment">Entertainment</option>
            <option value="health">Health</option>
            <option value="science">Science</option>
            <option value="sports">Sports</option>
            <option value="technology">Technology</option>
          </select>
        </div> */}
      </div>
      <div className="dashboard">
        {newslist
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

      
    </>
  );
}

export default Dashboard;
