import React from 'react';
import "../Css/RegLog.css";
import svData from '../svData.json';

//import { NavLink } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            warningMsg: "Incorrect username/password! How DARE You, Sir!"
        }
    }

    getServerURL = () => {
        return svData.serverLink;
    }

    onLogin = async (ev) => {
        try {
            ev.preventDefault();
            const inputs = document.querySelectorAll("#logform input");
            const usernameText = inputs[0].value;
            const passText = inputs[1].value;

            let res = await fetch(this.getServerURL() + "login/", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: usernameText,
                    pass: passText
                })
            });
            res = await res.json();
            this.setState({
                warningMsg: res.toString()
            });
        } catch (err) {
            console.log("___________ERROR___________\n", err.message);
        }
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