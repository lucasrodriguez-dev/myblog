import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { Sidebar } from "../components/layout/Sidebar";
import { Footer } from "../components/layout/Footer";
import { NotFound } from "../components/pages/NotFound";
import { Home } from "../components/pages/Home";
import { Articles } from "../components/pages/Articles";
import { ArticlePage } from "../components/pages/ArticlePage";
import { Create } from "../components/pages/Create";
import { Edit } from "../components/pages/Edit";
import { Search } from "../components/pages/Search";
import { Global } from "../helpers/Global";

export const MyRoutes = () => {
    return (
        <BrowserRouter>
            <Header />
            <div className="layout">
                <Sidebar />
                <section className="content">
                    <Routes>
                        <Route path={`*`} element={<NotFound />} />
                        <Route path="/" element={<Home />} />
                        <Route path={`/${Global.HOME_PATH}`} element={<Home />} />
                        <Route path={`/${Global.ARTICLES_PATH}`} element={<Articles />} />
                        <Route path={`/${Global.ARTICLE_PATH}/:_id`} element={<ArticlePage />} />
                        <Route path={`/${Global.CREATEARTICLE_PATH}`} element={<Create />} />
                        <Route path={`/${Global.EDIT_PATH}/:_id`} element={<Edit />} />
                        <Route path={`/${Global.SEARCH_PATH}/:search`} element={<Search />} />
                    </Routes>
                </section>
            </div>
            <Footer />
        </BrowserRouter>
    )
};