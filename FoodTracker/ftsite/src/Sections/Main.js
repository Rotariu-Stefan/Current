//import React from 'react';
//import logo from './logo.svg';
//import './App.css';

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from "../MainPages/Home";
import DailyMeals from '../MainPages/DailyMeals';
import YourFood from '../MainPages/YourFood';
import YourPlans from '../MainPages/YourPlans';
import YourStats from '../MainPages/YourStats';
import GlobalStats from '../MainPages/GlobalStats';
import GlobalData from '../MainPages/GlobalData';
import Login from '../MainPages/Login';
import Register from '../MainPages/Register';
import Error from '../MainPages/Error';

const Main = () => {
    return (
        //<DailyMeals />
        <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/DailyMeals" component={DailyMeals} />
            <Route path="/YourFood" component={YourFood} />
            <Route path="/YourPlans" component={YourPlans} />
            <Route path="/YourStats" component={YourStats} />
            <Route path="/GlobalStats" component={GlobalStats} />
            <Route path="/GlobalData" component={GlobalData} />
            <Route path="/Login" component={Login} />
            <Route path="/Register" component={Register} />
            <Route component={Error} />
        </Switch>
    );
}

export default Main;