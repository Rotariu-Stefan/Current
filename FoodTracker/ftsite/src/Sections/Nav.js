import React from 'react';

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

const Nav = ({ navClick }) => {
    return (
        <nav className="subblock boxShow">
            <span onClick={() => navClick("DailyMeals")} className="navlink textHigh">Daily Meals</span>|
            <span onClick={() => navClick("YourFood")} className="navlink textHigh">Your Food</span>|
            <span onClick={() => navClick("YourPlans")} className="navlink textHigh">Your Plans</span>|
            <span onClick={() => navClick("YourStats")} className="navlink textHigh">Your Stats</span>|
            <span onClick={() => navClick("GlobalStats")} className="navlink textHigh">Global Stats</span>|
            <span onClick={() => navClick("GlobalData")} className="navlink textHigh">Global Data</span>
        </nav>
    );
}

export default Nav;