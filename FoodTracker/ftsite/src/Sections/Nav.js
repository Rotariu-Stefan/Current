/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-onchange */
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

    render() {
      return (
        <nav className="subblock boxShow">
          <span
            className="navlink textHigh" data-page="DailyMeals" role="link"
            tabIndex="0" onClick={this.onNavClick}
          >Daily Meals</span>|
          <span
            className="navlink textHigh" data-page="YourFood"
            role="link" tabIndex="0" onClick={this.onNavClick}
          >Your Food</span>|
          <span
            className="navlink textHigh" data-page="YourPlans"
            role="link" tabIndex="0" onClick={this.onNavClick}
          >Your Plans</span>|
          <span
            className="navlink textHigh" data-page="YourStats"
            role="link" tabIndex="0" onClick={this.onNavClick}
          >Your Stats</span>|
          <span
            className="navlink textHigh" data-page="GlobalStats"
            role="link" tabIndex="0" onClick={this.onNavClick}
          >Global Stats</span>|
          <span
            className="navlink textHigh" data-page="GlobalData"
            role="link" tabIndex="0" onClick={this.onNavClick}
          >Users Data</span>
        </nav>
      );
    }

    onNavClick = (ev) => this.context.changeMainPage(ev.currentTarget.getAttribute("data-page"));
}

export default Nav;
