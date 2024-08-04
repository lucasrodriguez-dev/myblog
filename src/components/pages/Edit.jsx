import React, { useEffect } from 'react';
import { useState } from 'react';
import { Apis } from '../../helpers/Apis';
import { useForm } from '../../hooks/useForm';
import { DoRequest } from '../../helpers/DoRequest';
import { useParams } from 'react-router-dom';

export const Edit = () => {

    const { form, send, change, clear } = useForm({});
    const image_error = `imageError`;
    const waiting = `waiting`;
    const [result, setResult] = useState(waiting);
    const params = useParams();
    const [article, setArticle] = useState({});
    const [loading, setLoading] = useState(true);
    const imageWidth = `100%`;

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
        }
    };

    const updateArticle = async (e) => {
        e.preventDefault();
        let newArticle = form;
        if(!newArticle.title){
            newArticle.title = article.title;
        }
        if(!newArticle.content){
            newArticle.content = article.content;
        }
        const { data } = await DoRequest(`${Apis.UPDATE_ARTICLE}/${params._id}`, "PUT", newArticle);
        setResult(data.status);
        if (data.status === Apis.SUCCESS) {
            if (e.target.file.files[0]) {
                const formData = new FormData();
                formData.append('file', e.target.file.files[0]);
                const { data: imageData } = await DoRequest(`${Apis.UPLOAD_IMAGE}/${params._id}`, "POST", formData, true);
                if (imageData.status === Apis.ERROR) {
                    setResult(image_error);
                }
            }
            clear();
        }
    };

    return (
        <section>
            {
                loading ? "Cargando..."
                    : (
                        <>
                            <h2>{
                                (result === waiting) ? ("Editando un artículo ✍")
                                    : (result === Apis.SUCCESS) ? ("Artículo actualizado ✅")
                                        : (result === image_error) ? ("Se ha actualizado el artículo, pero la imagen es inválida ⚠")
                                            : ("No se pudo actualizar el artículo ❌")
                            }
                            </h2>
                            <form className="form" onSubmit={updateArticle}>
                                <div className="form-group">
                                    <input type="text" name="title" defaultValue={article.title} onChange={change} />
                                </div>
                                <div className="form-group">
                                    <textarea name="content" defaultValue={article.content} onChange={change}></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="file" className="label-image">
                                        <div>
                                            <img src={`${Apis.GET_IMAGE}/${article.image}`} width={imageWidth} />
                                        </div>
                                    </label>
                                    <input type="file" id="file" name="file" placeholder="Imagen" onChange={change} />
                                </div>
                                <div className="form-group form-group-buttons">
                                    <input type="reset" value="Cancelar" className="btn" />
                                    <input type="submit" value="Guardar" className="btn" />
                                </div>
                            </form>
                        </>
                    )
            }
        </section>
    )
}
