// import { NavLink } from 'react-router-dom';
//
// const Header = () => {
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
// }

/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-onchange */
import React from "react";

import { AppContext } from "../AppContext";


class Header extends React.Component {
   static contextType = AppContext;

   constructor(props) {
     super(props);

     this.state = { isLogged: false };
   }

   render() {
     const { isLogged } = this.state;
     const { username, pic } = this.context.currentUser;

     return (
       <header className="subblock boxShow">
         <img alt="[NO LOGO]" className="logo" src="SitePics/head.png" />
         <div className="titleArea" role="link" tabIndex="0" onClick={this.onHomeClick}>
           <h1 className="pagetitle">FoodTracker</h1>
           <h3 className="subtitle">Define and Track your Food and diet goals on Your own terms!</h3>
         </div>
         <div className="profileArea boxShow">
           <span role="link" tabIndex="0" onClick={this.onProfileClick}>
             {username}
             <br />
             <img alt="[NO PIC]" src={`UserPics/${pic}`} />
           </span>
           <span className="navlink" role="link" tabIndex="0" onClick={this.onProfileClick}>
             {isLogged ? "Profile" : "Register"}
           </span>
           <span className="navlink" role="link" tabIndex="0" onClick={this.onLogClick}>
             {isLogged ? "Logout" : "Login"}
           </span>
         </div>
       </header>
     );
   }

   onHomeClick = () => this.context.changeMainPage("Home");
   onProfileClick = () => this.context.changeMainPage(this.state.isLogged ? "Profile" : "Register");
   onLogClick = () => {
     const { isLogged } = this.state;
     const { updateUser, changeMainPage } = this.context;

     if (isLogged) {
       updateUser(null);
       changeMainPage("Home");
     } else {
       changeMainPage("Login");
     }
   };

  updateUser = (newIsLogged) => {
    this.setState({ isLogged: newIsLogged });
  };
}

export default Header;
