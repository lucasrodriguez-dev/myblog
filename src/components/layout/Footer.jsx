import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake } from '@fortawesome/free-solid-svg-icons';
import { Global } from '../../helpers/Global';

export const Footer = () => {
  return (
    <footer>
      <p>Lucas Rodríguez</p>
      <div className="btn no-bg">
        <a href={Global.CONTACT_URL} target="_blank">
          <FontAwesomeIcon icon={faHandshake} />
        </a>
      </div>
    </footer>
  )
}
