import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Sections/Header';
import Nav from './Sections/Nav';
import Main from './Sections/Main';
import Footer from './Sections/Footer';

//import { BrowserRouter } from 'react-router-dom';
//
//ReactDOM.render(
//    <BrowserRouter>
//        <Header />
//        <Nav />
//        <Main />
//        <Footer />
//    </BrowserRouter>,
//    document.querySelector("#root"));

const main = React.createRef();

ReactDOM.render(
    [
        <Header key="H" navClick={(navText) => main.current.changePage(navText)} />,
        <Nav key="N" navClick={(navText) => main.current.changePage(navText)} />,
        <Main key="M" ref={main} page="Home" />,
        <Footer key="F" />
    ],
    document.querySelector("#root"));