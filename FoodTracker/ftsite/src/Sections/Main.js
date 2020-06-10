//import { Route, Switch } from 'react-router-dom';
//
//const Main = () => {
//    return (
//        <Switch>
//            <Route path="/" component={Home} exact/>
//            <Route path="/DailyMeals" component={DailyMeals} />
//            <Route path="/YourFood" component={YourFood} />
//            <Route path="/YourPlans" component={YourPlans} />
//            <Route path="/YourStats" component={YourStats} />
//            <Route path="/GlobalStats" component={GlobalStats} />
//            <Route path="/GlobalData" component={GlobalData} />
//            <Route path="/Login" component={Login} />
//            <Route path="/Register" component={Register} />
//            <Route component={Error} />
//        </Switch>
//    );
//}

import React from 'react';

import Home from "../MainPages/Home";
import DailyMeals from '../MainPages/DailyMeals';
import YourFood from '../MainPages/YourFood';
import YourPlans from '../MainPages/YourPlans';
import YourStats from '../MainPages/YourStats';
import GlobalStats from '../MainPages/GlobalStats';
import GlobalData from '../MainPages/UsersData';
import Profile from '../MainPages/Profile';
import Login from '../MainPages/Login';
import Register from '../MainPages/Register';
import Error from '../MainPages/Error';

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: props.page ? props.page : "Home"
        };
    }

    changePage = (newPage) => {
        const { page } = this.state;

        if (page !== newPage)
            this.setState({
                page: newPage
            });
    }

    render = () => {
        switch (this.state.page) {
            case "Home":
                return <Home />;
            case "DailyMeals":
                return <DailyMeals />;
            case "YourFood":
                return <YourFood />;
            case "YourPlans":
                return <YourPlans />;
            case "YourStats":
                return <YourStats />;
            case "GlobalStats":
                return <GlobalStats />;
            case "GlobalData":
                return <GlobalData />;
            case "Profile":
                return <Profile />;
            case "Register":
                return <Register />;
            case "Login":
                return <Login />;
            default:
                return <Error />;
        }
    }
}

export default Main;