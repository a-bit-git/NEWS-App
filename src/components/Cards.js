
import React from 'react';
import { Link } from 'react-router-dom';

const Cards = ({ title, urlToImage, name, publishedAt, url }) => {
  return (
    <Link to={url} className="cards-link icon">
      <div className="cards">
        <img className="newsimg" alt="news" src={urlToImage} />
        <h4 className="title">{title}</h4>
        <div className="detail">
          <p>{publishedAt}</p>
          <p>{name}</p>
        </div>
      </div>
    </Link>
  );
}

export default Cards;
