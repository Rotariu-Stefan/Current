import React from 'react';

import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className="subblock boxShow">
            <img src="SitePics/head.png" alt="[NO LOGO]" className="logo" />
            <div id="titleArea">
                <NavLink to="/">
                    <h1 id="title">FoodTracker</h1>
                    <h3 id="subtitle">Define and Track your Food and diet goals on Your own terms!</h3>
                </NavLink>
            </div>
            <div id="profileArea" className="boxShow">
                <NavLink to="/Login">
                    Guest<br />
                    <img src="SitePics/profileEmpty.png" alt="[NO PIC]" />
                </NavLink>
                <NavLink className="navlink" to="/Register">Register</NavLink>
                <NavLink className="navlink" to="/Login">Login</NavLink>
            </div>
        </header>
    );
}

export default Header;