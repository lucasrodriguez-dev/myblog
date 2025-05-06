import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = () => {
    return (
        <header className="header">
            <NavLink to="/"><h1>YourBlog</h1></NavLink>
            <nav className="navbar">
                <ul>
                    <li>
                        <NavLink to="/">Inicio</NavLink>
                    </li>
                    <li>
                        <NavLink to="/articles">Artículos</NavLink>
                    </li>
                    <li>
                        <NavLink to="/create-article">Crear artículo</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
