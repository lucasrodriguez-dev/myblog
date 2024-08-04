import React from 'react'
import { NavLink } from 'react-router-dom'
import { Global } from '../../helpers/Global'

export const Home = () => {
  return (
    <section>
      <h2 className="main-title">Bienvenido a tu blog! 🗒</h2>
      <p className="main-description">Puedes crear, editar y eliminar tus propios artículos con imágenes incluidas.</p>
      <p id="home-info">Desarrollado con el MERN Stack 🚀.</p>
      <NavLink to={`/${Global.ARTICLES_PATH}`} className="btn main-btn">Ver artículos</NavLink>
    </section>
  )
}
