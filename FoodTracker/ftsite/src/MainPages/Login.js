/* eslint-disable jsx-a11y/click-events-have-key-events*/
import React from "react";

import "../Css/UserForms.css";
import { app } from "../App";

// import { NavLink } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      warningMsg: null,
      isLoading: false,
    };
  }

  onLogin = async(ev) => {
    ev.preventDefault();

    this.setState({ isLoading: true });
    (async() => {
      try {
        const inputs = document.querySelectorAll(".userform input");
        const usernameText = inputs[0].value;
        const passText = inputs[1].value;

        let res = await fetch(`${app.getServerURL()}/login`, {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: usernameText,
            pass: passText,
          }),
        });
        if (res.status === 200) {
          res = await res.json();
          if (typeof res === "string") {
            this.setState({ warningMsg: res });
          } else {
            app.updateUser(res);
            app.changeMainPage("Profile");
          }
        } else {
          console.log(await res.json());
        }
      } catch (err) {
        console.log("___________ERROR___________\n", err.message);
      } finally {
        this.setState({ isLoading: false });
      }
    })();
  };

  render = () => {
    const { warningMsg, isLoading } = this.state;

    return (
      <main className="mainUserForm boxShow">
        <form className="userform subblock boxShow" onSubmit={this.onLogin}>
          <h1 className="lineDown">Enter Username/Email and Password to Login!</h1>
          <div className="fields">
            <span>Username/Email:</span>
            <input name="username" type="text" />
            <span>Password:</span>
            <input name="password" type="password" />
            <span disabled={isLoading}>
              Remember Me?
              <input name="member" type="checkbox" />
            </span>
            <span className={warningMsg === null ? "hidden" : "warning"}>{this.state.warningMsg}</span>
            <input className="ftButton" disabled={isLoading} type="submit" value="Login" />
          </div>
          {/*
        <div className="loglinks">
        <NavLink to="/">Forgot Password?</NavLink>
        <NavLink to="/Register">New here? Go Register!</NavLink>
        </div>
        */}
          <div className="loglinks">
            <span disabled={isLoading} onClick={() => app.changeMainPage("Home")}>Forgot Password?</span>
            <span disabled={isLoading} onClick={() => app.changeMainPage("Register")}>New here? Go Register!</span>
          </div>
        </form>
      </main>
    );
  }
}

export default Login;
