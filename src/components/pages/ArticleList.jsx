import React from 'react';
import { Article } from './Article';

//sizeNumber = 0/1/2
export const ArticleList = ({ articles, setArticles, editable, sizeNumber = 0 }) => {
    const widthType = ["100", "350", "350"];
    const width = widthType[sizeNumber];
    return (
        articles.map((article) =>
            <Article article={article} sizeNumber={sizeNumber} imageWidth={width} editable={editable} key={article._id} articles={articles} setArticles={setArticles} />
        )
    );
}