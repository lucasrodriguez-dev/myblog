import React, { useEffect, useState } from 'react';
import { Apis } from '../../helpers/Apis';
import { Global } from '../../helpers/Global';
import { NavLink } from 'react-router-dom';
import { Delete } from '../buttons/Delete';
import { Edit } from '../buttons/Edit';

export const Article = ({ article, sizeNumber, imageWidth, editable, articles, setArticles }) => {

  const sizeType = ["small", "medium", "large"];
  const size = sizeType[sizeNumber];

  const formatContent = (content) => {
    const limit = [150, 260, content.length];
    let finalContent = {
      text: content,
      formatted: (content.length >= limit[sizeNumber])
    }
    if (finalContent.formatted) {
      finalContent.text = finalContent.text.slice(0, limit[sizeNumber]);
    }
    return finalContent;
  };

  const content = formatContent(article.content);

  return (
    <article className={`article-item article-item-${size}`}>
      <div>
        <img src={`${Apis.GET_IMAGE}/${article.image}`} width={`${imageWidth}px`} />
      </div>
      <div className="article-item-info">
        <div className="article-item-info-text">
          <h3 className={`article-item-info-title article-item-info-title-${size}`}><NavLink to={`/${Global.ARTICLE_PATH}/${article._id}`}>{article.title}</NavLink></h3>
          <p className={`article-item-info-content-${size}`}>
            {content.text}
            {content.formatted && (<NavLink to={`/${Global.ARTICLE_PATH}/${article._id}`}> ...</NavLink>)}
          </p>
        </div>
        {editable && (
          <div className="article-item-info-buttons">
            <Edit articleId={article._id} />
            <Delete articleId={article._id} articles={articles} setArticles={setArticles} />
          </div>
        )}
      </div>
    </article>
  );
}
