import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Global } from '../../helpers/Global';

export const Edit = ({ articleId }) => {

  const navigate = useNavigate();

  return (
    <button className="btn btn-edit" onClick={() => navigate(`/${Global.EDIT_PATH}/${articleId}`, { replace: true })}><FontAwesomeIcon icon={faPen} /></button>
  )
}
