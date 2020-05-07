import React from 'react';
//import { NavLink } from 'react-router-dom';

import "../Css/RegLog.css";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            warningMsg: "Incorrect username/password! How DARE You, Sir!"
        }
    }

    onLogin = (ev) => {
        ev.preventDefault();
        if (this.state.warningMsg.startsWith("Incor"))
            this.setState({ warningMsg: "NO GORIAC ALLOWED!! GO AWAY! G A O A Z A ~~~\nNO GORIAC ALLOWED!! GO AWAY! G A O A Z A ~~~NO GORIAC ALLOWED!! GO AWAY! G A O A Z A ~~~\nNO GORIAC ALLOWED!! GO AWAY! G A O A Z A ~~~\nNO GORIAC ALLOWED!! GO AWAY! G A O A Z A ~~~\n" });
        else if (this.state.warningMsg.startsWith("NO GORI"))
            this.setState({ warningMsg: "G A O A Z A ~~~G A O A Z A ~~~G A O A Z A ~~~G A O A Z A ~~~G A O A Z A ~~~G A O A Z A ~~~G A O A Z A ~~~G A O A Z A ~~~G A O A Z A ~~~G A O A Z A ~~~G A O A Z A ~~~G A O A Z A ~~~G A O A Z A ~~~G A O A Z A ~~~G A O A Z A ~~~G A O A Z A ~~~G A O A Z A ~~~G A O A Z A ~~~G A O A Z A ~~~G A O A Z A ~~~G A O A Z A ~~~G A O A Z A ~~~G A O A Z A ~~~G A O A Z A ~~~G A O A Z A ~~~G A O A Z A ~~~G A O A Z A ~~~G A O A Z A ~~~G A O A Z A ~~~G A O A Z A ~~~G A O A Z A ~~~G A O A Z A ~~~G A O A Z A ~~~G A O A Z A ~~~G A O A Z A ~~~G A O A Z A ~~~G A O A Z A ~~~G A O A Z A ~~~G A O A Z A ~~~" });
        else if (this.state.warningMsg.startsWith("G A O"))
            this.setState({ warningMsg: "Meh..." });
    }

    render = () => {
        return (
            <main className="mainRegLog boxShow">
                <form onSubmit={this.onLogin} id="logform" className="subblock boxShow">
                    <h1 className="lineDown">Enter Username/Email and Password to Login!</h1>
                    <div className="fields">
                        <span>Username/Email: </span><input type="text" name="username" />
                        <span>Password: </span><input type="password" name="password" />
                        <span>Remember Me? <input type="checkbox" name="member" /></span>
                        <span className="warning">{this.state.warningMsg}</span>
                        <input className="ftButton" type="submit" value="Login" />
                    </div>
                    {/*
                    <div className="loglinks">
                        <NavLink to="/">Forgot Password?</NavLink>
                        <NavLink to="/Register">New here? Go Register!</NavLink>
                    </div>
                    */}
                    <div className="loglinks">
                        <span onClick={() => this.props.navClick("Home")}>Forgot Password?</span>
                        <span onClick={() => this.props.navClick("Register")}>New here? Go Register!</span>
                    </div>
                </form>
            </main>
        );
    }
}
export default Login;