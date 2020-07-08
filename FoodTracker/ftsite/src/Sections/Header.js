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

import React from "react";

import { AppContext } from "../AppContext";


class Header extends React.Component {
   static contextType = AppContext;

   constructor(props) {
     super(props);

     this.state = { isLogged: false };
   }

   render = () => {
     const { isLogged } = this.state;
     const { changeMainPage } = this.context;
     const { username, pic } = this.context.currentUser;

     return (
       <header className="subblock boxShow">
         <img alt="[NO LOGO]" className="logo" src="SitePics/head.png" />
         <div id="titleArea" onClick={() => changeMainPage("Home")}>
           <h1 id="title">FoodTracker</h1>
           <h3 id="subtitle">Define and Track your Food and diet goals on Your own terms!</h3>
         </div>
         <div className="boxShow" id="profileArea">
           <span onClick={() => changeMainPage(isLogged ? "Profile" : "Register")}>
             {username}
             <br />
             <img alt="[NO PIC]" src={`UserPics/${pic}`} />
           </span>
           <span className="navlink" onClick={() => changeMainPage(isLogged ? "Profile" : "Register")}>
             {isLogged ? "Profile" : "Register"}
           </span>
           <span className="navlink" onClick={this.onLogClick}>
             {isLogged ? "Logout" : "Login"}
           </span>
         </div>
       </header>
     );
   };

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
