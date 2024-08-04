import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Apis } from '../../helpers/Apis';
import { ArticleList } from './ArticleList';
import { DoRequest } from '../../helpers/DoRequest';

export const Search = () => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    getArticles();
  }, []);

  useEffect(() => {
    getArticles();
  }, [params]);

  const getArticles = async () => {
    const { data, loading } = await DoRequest(`${Apis.SEARCH}/${params.search}`, "GET");
    if (data.status === Apis.SUCCESS) {
      setArticles(data.articles);
    }
    setLoading(false);
  };

  return (
    <>
      <h2>Artículos encontrados</h2>
      {
        loading ? "Cargando..." : (
          articles.length >= 1 ?
            <section className="article-list">
              <ArticleList articles={articles} setArticles={setArticles} editable={true} sizeNumber={1} />
            </section> :
            <h3>No se encontró ningún artículo</h3>
        )
      }
    </>
  )
}
