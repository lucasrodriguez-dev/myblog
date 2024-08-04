import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DoRequest } from '../../helpers/DoRequest';
import { Apis } from '../../helpers/Apis';
import { NotFound } from './NotFound';
import { Global } from '../../helpers/Global';


export const ArticlePage = () => {

    const params = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [paragraphs, setParagraphs] = useState([]);
    const imageWidth = "1000";

    useEffect(() => {
        getArticle();
    }, []);

    useEffect(() => {
        getArticle();
    }, [params]);

    const getArticle = async () => {
        const { data } = await DoRequest(`${Apis.FINDONE_ARTICLE}/${params._id}`, "GET");
        setLoading(false);
        if (data.status === Apis.SUCCESS) {
            setArticle(data.article);
            //separamos en parrafos segun los saltos de linea
            const encodedContent = data.article.content.replace(/\n/g, '<br>');
            setParagraphs(encodedContent.split('<br>'));
        }
    };

    const formatDate = (date) => {
        const months = Global.MONTHS;
        const splitDate = date.split("-");
        const year = splitDate[0];
        const monthNumber = splitDate[1];
        const month = months[monthNumber-1];
        const day = splitDate[2].slice(0, 2);
        const time = splitDate[2].slice(3, 8);
        console.log(month);
        return `Publicado el ${day} de ${month} de ${year} a las ${time}`;
    };

    return (
        <section className="article-item-large">
            {
                (loading) ? "Cargando..."
                    :
                    (article) ? (
                        <>
                            <h2 className="article-item-info-title-large">{article.title}</h2>
                            <div>
                                <img src={`${Apis.GET_IMAGE}/${article.image}`} width={`${imageWidth}px`} />
                            </div>
                            <span className="article-item-info-date">{formatDate(article.date)}</span>
                            <div className="article-item-info-content-large">
                                {
                                    paragraphs.length >= 1 && (
                                        paragraphs.map((paragraph, index) =>
                                            (<p key={index} className="article-content-paragraph">{paragraph}</p>)
                                        )
                                    )
                                }
                            </div>
                        </>
                    )
                        : (
                            <>
                                <NotFound />
                            </>
                        )
            }
        </section>
    )
}
