import React from 'react';
import { NavLink } from 'react-router-dom';
import { Global } from '../../helpers/Global';

export const NotFound = () => {
    return (
        <section>
            <h2 className="main-title">Error 404 ❌</h2>
            <p className="main-description">Esta página no existe</p>
            <NavLink to="/" className="btn main-btn">Volver a Inicio</NavLink>
        </section>
    )
}
