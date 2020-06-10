import React from 'react';
import { app } from '../App';

//import { NavLink } from 'react-router-dom';
//
//const Nav = () => {
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
//}

class Nav extends React.Component {
    render = () => {
        return (
            <nav className="subblock boxShow">
                <span onClick={() => app.changeMainPage("DailyMeals")} className="navlink textHigh">Daily Meals</span>|
            <span onClick={() => app.changeMainPage("YourFood")} className="navlink textHigh">Your Food</span>|
            <span onClick={() => app.changeMainPage("YourPlans")} className="navlink textHigh">Your Plans</span>|
            <span onClick={() => app.changeMainPage("YourStats")} className="navlink textHigh">Your Stats</span>|
            <span onClick={() => app.changeMainPage("GlobalStats")} className="navlink textHigh">Global Stats</span>|
            <span onClick={() => app.changeMainPage("GlobalData")} className="navlink textHigh">Users Data</span>
            </nav>
        );
    };
}

export default Nav;