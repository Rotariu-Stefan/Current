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

import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Sections/Header';
import Nav from './Sections/Nav';
import Main from './Sections/Main';
import Footer from './Sections/Footer';

const main = React.createRef();
const footer = React.createRef();
let nrClicks = 0;

const onIncClicks = () => {
    nrClicks++;
    footer.current.setState({
        nrClicks
    });
}

ReactDOM.render(
    [
        <Header navClick={(navText) => main.current.changePage(navText)} key="H" />,
        <Nav navClick={(navText) => main.current.changePage(navText)} key="N" />,
        <Main ref={main} incClicks={onIncClicks} key="M" />,
        <Footer ref={footer} key="F" />
    ],
    document.querySelector("#root"));