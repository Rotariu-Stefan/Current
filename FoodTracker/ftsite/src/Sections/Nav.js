import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
    return (
        <nav className="subblock boxShow">
            <NavLink className="navlink textHigh" to="/DailyMeals">Daily Meals</NavLink>|
                <NavLink className="navlink textHigh" to="/YourFood">Your Food</NavLink>|
                <NavLink className="navlink textHigh" to="/YourPlans">Your Plans</NavLink>|
                <NavLink className="navlink textHigh" to="/YourStats">Your Stats</NavLink>|
                <NavLink className="navlink textHigh" to="/GlobalStats">Global Stats</NavLink>|
                <NavLink className="navlink textHigh" to="/GlobalData">Global Data</NavLink>
        </nav>
    );
}

export default Nav;