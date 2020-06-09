//import { NavLink } from 'react-router-dom';
//
//const Header = () => {
//    return (
//        <header className="subblock boxShow">
//            <img src="SitePics/head.png" alt="[NO LOGO]" className="logo" />
//            <div id="titleArea">
//                <NavLink to="/">
//                    <h1 id="title">FoodTracker</h1>
//                    <h3 id="subtitle">Define and Track your Food and diet goals on Your own terms!</h3>
//                </NavLink>
//            </div>
//            <div id="profileArea" className="boxShow">
//                <NavLink to="/Login">
//                    Guest<br />
//                    <img src="SitePics/profileEmpty.png" alt="[NO PIC]" />
//                </NavLink>
//                <NavLink className="navlink" to="/Register">Register</NavLink>
//                <NavLink className="navlink" to="/Login">Login</NavLink>
//            </div>
//        </header>
//    );
//}

import React from 'react';
import { app } from '../App';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false,
            username: app.defaultUser.username,
            pic: app.defaultUser.pic
        };
    }

    updateUser = (newIsLogged, newUsername, newPic) => {
        this.setState({
            isLogged: newIsLogged,
            username: newUsername,
            pic: newPic
        });
    }

    onLogClick = () => {
        const { isLogged } = this.state;

        if (isLogged) {
            app.updateUser(null);
            app.changeMainPage("Home");
        }
        else
            app.changeMainPage("Login");
    }

    render = () => {
        const { isLogged, username, pic } = this.state;

        return (
            <header className="subblock boxShow">
                <img src="SitePics/head.png" alt="[NO LOGO]" className="logo" />
                <div onClick={() => app.changeMainPage("Home")} id="titleArea">
                    <h1 id="title">FoodTracker</h1>
                    <h3 id="subtitle">Define and Track your Food and diet goals on Your own terms!</h3>
                </div>
                <div id="profileArea" className="boxShow">
                    <span onClick={() => app.changeMainPage(isLogged ? "Profile" : "Register")}>
                        {username}
                        <br />
                        <img src={`UserPics/${pic ? pic : "profileEmpty.png"}`} alt="[NO PIC]" />
                    </span>
                    <span onClick={() => app.changeMainPage(isLogged ? "Profile" : "Register")} className="navlink">
                        {isLogged ? "Profile" : "Register"}
                    </span>
                    <span onClick={this.onLogClick} className="navlink">
                        {isLogged ? "Logout" : "Login"}
                    </span>
                </div>
            </header>
        );
    };
}

export default Header;