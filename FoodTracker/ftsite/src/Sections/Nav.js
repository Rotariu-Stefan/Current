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
            <span onClick={() => navClick("DailyMeals")} className="navlink textHigh">DailyMeals</span>|
            <span onClick={() => navClick("YourFood")} className="navlink textHigh">YourFood</span>|
            <span onClick={() => navClick("YourPlans")} className="navlink textHigh">YourPlans</span>|
            <span onClick={() => navClick("YourStats")} className="navlink textHigh">YourStats</span>|
            <span onClick={() => navClick("GlobalStats")} className="navlink textHigh">GlobalStats</span>|
            <span onClick={() => navClick("GlobalData")} className="navlink textHigh">GlobalData</span>
        </nav>
    );
}

export default Nav;