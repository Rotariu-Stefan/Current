import React from 'react';
import "../Css/RegLog.css";
import { app } from '../App';
import svData from '../svData.json';

//import { NavLink } from 'react-router-dom';

getServerURL = () => {
    return svData.serverLink;
}

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            warningMsg: null
        };
    }

    onLogin = async (ev) => {
        try {
            ev.preventDefault();
            const inputs = document.querySelectorAll("#logform input");
            const usernameText = inputs[0].value;
            const passText = inputs[1].value;

            let res = await fetch(getServerURL() + "/login", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: usernameText,
                    pass: passText
                })
            });
            if (res.status === 200) {
                res = await res.json();
                if (typeof res === "string")
                    this.setState({
                        warningMsg: res
                    });
                else {
                    app.updateUser(res);
                    app.changeMainPage("Profile");
                }
            }
            else {
                console.log(await res.json());
            }

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
                        <span className={this.state.warningMsg === null ? "hidden" : "warning"}>{this.state.warningMsg}</span>
                        <input className="ftButton" type="submit" value="Login" />
                    </div>
                    {/*
                    <div className="loglinks">
                        <NavLink to="/">Forgot Password?</NavLink>
                        <NavLink to="/Register">New here? Go Register!</NavLink>
                    </div>
                    */}
                    <div className="loglinks">
                        <span onClick={() => app.changeMainPage("Home")}>Forgot Password?</span>
                        <span onClick={() => app.changeMainPage("Register")}>New here? Go Register!</span>
                    </div>
                </form>
            </main>
        );
    }
}

export default Login;