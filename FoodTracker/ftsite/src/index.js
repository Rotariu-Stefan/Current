import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Header from './Sections/Header';
import Nav from './Sections/Nav';
import Main from './Sections/Main';
import Footer from './Sections/Footer';

ReactDOM.render(
    <BrowserRouter>
        <Header />
        <Nav />
        <Main />
        <Footer />
    </BrowserRouter>,
    document.querySelector("#root"));