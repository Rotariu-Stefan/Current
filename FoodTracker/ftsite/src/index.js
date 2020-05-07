import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Sections/Header';
import Nav from './Sections/Nav';
import Main from './Sections/Main';
import Footer from './Sections/Footer';

//import { BrowserRouter } from 'react-router-dom';

const main = React.createRef();

ReactDOM.render(
    [
        <Header navClick={(navText) => main.current.changePage(navText)} />,
        <Nav navClick={(navText) => main.current.changePage(navText)} />,
        <Main ref={main} page="Home" />,
        <Footer />
    ],
    document.querySelector("#root"));