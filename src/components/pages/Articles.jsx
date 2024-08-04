import React from 'react';
import { useEffect, useState } from 'react';
import { Apis } from '../../helpers/Apis';
import { ArticleList } from './ArticleList';
import { DoRequest } from '../../helpers/DoRequest';

export const Articles = () => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    const url = Apis.FIND_ARTICLES;
    const { data, loading } = await DoRequest(url, "GET");
    if (data.status === Apis.SUCCESS) {
      setArticles(data.articles);
    }
    setLoading(false);
  };

  return (
    <>
      <h2>Tus Artículos</h2>
      {
        loading ? "Cargando..." : (
          articles.length >= 1 ?
            <section className="article-list">
              <ArticleList articles={articles} setArticles={setArticles} editable={true} sizeNumber={1} />
            </section> :
            <h3>Aún no tienes ningún artículo</h3>
        )
      }
    </>
  )
}
