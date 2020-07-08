import React from "react";

import { AppContext } from "../AppContext";

// import { NavLink } from 'react-router-dom';
//
// const Nav = () => {
//    return (
//        <nav className="subblock boxShow">
//            <NavLink className="navlink textHigh" to="/DailyMeals">Daily Meals</NavLink>|
//            <NavLink className="navlink textHigh" to="/YourFood">Your Food</NavLink>|
//            <NavLink className="navlink textHigh" to="/YourPlans">Your Plans</NavLink>|
//            <NavLink className="navlink textHigh" to="/YourStats">Your Stats</NavLink>|
//            <NavLink className="navlink textHigh" to="/GlobalStats">Global Stats</NavLink>|
//            <NavLink className="navlink textHigh" to="/GlobalData">Global Data</NavLink>
//        </nav>
//    );
// }

class Nav extends React.Component {
    static contextType = AppContext;

    render = () => (
      <nav className="subblock boxShow">
        <span className="navlink textHigh" onClick={() => this.context.changeMainPage("DailyMeals")}>Daily Meals</span>|
        <span className="navlink textHigh" onClick={() => this.context.changeMainPage("YourFood")}>Your Food</span>|
        <span className="navlink textHigh" onClick={() => this.context.changeMainPage("YourPlans")}>Your Plans</span>|
        <span className="navlink textHigh" onClick={() => this.context.changeMainPage("YourStats")}>Your Stats</span>|
        <span className="navlink textHigh" onClick={() => this.context.changeMainPage("GlobalStats")}>Global Stats</span>|
        <span className="navlink textHigh" onClick={() => this.context.changeMainPage("GlobalData")}>Users Data</span>
      </nav>
    );
}

export default Nav;
