import React from 'react';
import { useEffect, useState } from 'react';
import { Apis } from '../../helpers/Apis';
import { ArticleList } from '../pages/ArticleList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export const Sidebar = () => {

  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getArticles();
  }, []);

  const doSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.searchText.value;
    navigate(`/search/${searchText}`, { replace: true });
  };

  const getArticles = async () => {
    const url = `${Apis.FIND_ARTICLES}/3`;
    let request = await fetch(url, {
      method: "GET"
    });
    let data = await request.json();
    if (data.status === Apis.SUCCESS) {
      setArticles(data.articles);
    }
  };

  return (
    <aside>
      <div className="searchbar">
        <form onSubmit={doSearch}>
          <input type="search" name="searchText" placeholder="Busca un artículo" />
          <div className="btn search-btn">
            <label htmlFor="searchButton" className="btn search-btn"><FontAwesomeIcon icon={faMagnifyingGlass} /></label>
            <input type="submit" id="searchButton" name="searchButton" value="" className="hidden" />
          </div>
        </form>
      </div>
      {
        articles.length >= 1 && (
          <div className="article-list">
            <ArticleList articles={articles} editable={false} sizeNumber={0} />
          </div>
        )
      }

    </aside>
  )
}
