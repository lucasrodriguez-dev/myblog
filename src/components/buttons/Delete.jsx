import React from 'react';
import { DoRequest } from '../../helpers/DoRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Apis } from '../../helpers/Apis';

export const Delete = ({ articleId, articles, setArticles }) => {

    const reallyWants = () => {
        return confirm("En serio quieres eliminar el artículo?");
    };

    const eliminate = async () => {
        if (reallyWants()) {
            const { data } = await DoRequest(`${Apis.DELETE_ARTICLE}/${articleId}`, "DELETE");
            if (data.status === Apis.SUCCESS) {
                let updatedArticles = articles.filter((article) => article._id !== articleId);
                setArticles(updatedArticles);
            }
        }
    };

    return (
        <button className="btn btn-delete" onClick={
            () => {
                eliminate()
            }
        } >
            <FontAwesomeIcon icon={faTrash} />
        </button>
    )
}
