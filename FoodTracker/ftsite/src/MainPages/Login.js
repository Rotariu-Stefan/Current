/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";

import "../Css/UserForms.css";
import { AppContext } from "../AppContext";
import { getServerURL } from "../methods";

// import { NavLink } from 'react-router-dom';

class Login extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.state = {
      warningMsg: null,
      isLoading: false,
    };
  }

  render = () => {
    const { warningMsg, isLoading } = this.state;
    const { changeMainPage } = this.context;

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
            <span disabled={isLoading} role="link" onClick={() => changeMainPage("Home")}>
              Forgot Password?</span>
            <span disabled={isLoading} role="link" onClick={() => changeMainPage("Register")}>
              New here? Go Register!</span>
          </div>
        </form>
      </main>
    );
  }

  onLogin = (ev) => {
    ev.preventDefault();

    this.setState({ isLoading: true });
    (async() => {
      const inputs = document.querySelectorAll(".userform input");
      const usernameText = inputs[0].value;
      const passText = inputs[1].value;
      const { updateUser, changeMainPage } = this.context;
      const successStatus = 200;

      let res = await fetch(`${getServerURL()}/login`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usernameText,
          pass: passText,
        }),
      });
      if (res.status === successStatus) {
        res = await res.json();
        if (typeof res === "string") {
          this.setState({ warningMsg: res });
        } else {
          updateUser(res);
          changeMainPage("Profile");
        }
      } else {
        console.log(await res.json());
      }
      this.setState({ isLoading: false });
    })();
  };
}

export default Login;
