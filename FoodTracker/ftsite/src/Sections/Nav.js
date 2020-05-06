import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <nav className="subblock boxShow">
            <Link className="navlink textHigh" to="/DailyMeals">Daily Meals</Link>|
            <Link className="navlink textHigh" to="/YourFood">Your Food</Link>|
            <Link className="navlink textHigh" to="/YourPlans">Your Plans</Link>|
            <Link className="navlink textHigh" to="/YourStats">Your Stats</Link>|
            <Link className="navlink textHigh" to="/GlobalStats">Global Stats</Link>|
            <Link className="navlink textHigh" to="/GlobalData">Global Data</Link>
        </nav>
    );
}

export default Nav;