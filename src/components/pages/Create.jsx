import React from 'react';
import { useState } from 'react';
import { Apis } from '../../helpers/Apis';
import { useForm } from '../../hooks/useForm';
import { DoRequest } from '../../helpers/DoRequest';

export const Create = () => {

  const { form, send, change, clear } = useForm({});
  const image_error = `imageError`;
  const waiting = `waiting`;
  const [result, setResult] = useState(waiting);

  const saveArticle = async (e) => {
    e.preventDefault();
    let newArticle = form;
    const { data } = await DoRequest(`${Apis.CREATE_ARTICLE}`, "POST", newArticle);
    setResult(data.status);
    if (data.status === Apis.SUCCESS){
      if (e.target.file.files[0]) {
        const formData = new FormData();
        formData.append('file', e.target.file.files[0]);
        const { data: imageData } = await DoRequest(`${Apis.UPLOAD_IMAGE}/${data.article._id}`, "POST", formData, true);
        if (imageData.status === Apis.ERROR) {
          setResult(image_error);
        }
      }
      clear();
    }
  };

  return (
    <section>
      <h2>{
        (result === waiting) ? ("Creando un artículo 📝")
          : (result === Apis.SUCCESS) ? ("Artículo publicado ✅")
            : (result === image_error) ? ("Se ha publicado el artículo, pero la imagen es inválida ⚠")
              : ("No se pudo publicar el artículo ❌")
      }
      </h2>
      <form className="form" onSubmit={saveArticle}>
        <div className="form-group">
          <input type="text" name="title" placeholder="Título del artículo" onChange={change} />
        </div>
        <div className="form-group">
          <textarea name="content" placeholder="Contenido" onChange={change}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="file" className="label-image">Imagen</label>
          <input type="file" id="file" name="file" placeholder="Imagen" onChange={change} />
        </div>
        <div className="form-group form-group-buttons">
          <input type="reset" value="Cancelar" className="btn" />
          <input type="submit" value="Publicar" className="btn" />
        </div>
      </form>
    </section>
  )
}
