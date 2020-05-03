import React from 'react';
import { NavLink } from 'react-router-dom';

import "../Css/RegLog.css";

const Login = () => {
    return (
        <main className="mainRegLog boxShow">
            <form id="logform" className="subblock boxShow">
                <h1 className="lineDown">Enter Username/Email and Password to Login!</h1>
                <div className="fields">
                    <span>Username/Email: </span><input type="text" name="username" />
                    <span>Password: </span><input type="password" name="password" />
                    <span>Remember Me? <input type="checkbox" name="member" /></span>
                    <span className="warning">Incorrect username/password! How DARE You, Sir!</span>
                    <input className="ftButton" type="submit" value="Login" />
                </div>
                <div className="loglinks">
                    <NavLink to="/Home">Forgot Password?</NavLink>
                    <NavLink to="/Register">New here? Go Register!</NavLink>
                </div>
            </form>
        </main>
    );
}

export default Login;