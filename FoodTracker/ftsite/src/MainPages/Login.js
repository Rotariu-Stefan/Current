/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-onchange */
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
      user: "",
      pass: "",

      warningMsg: null,
      isLoading: false,
    };
  }

  render() {
    const { warningMsg, isLoading } = this.state;

    return (
      <main className="mainUserForm boxShow">
        <form className="userform subblock boxShow" onSubmit={this.onLogin}>
          <h1 className="lineDown">Enter Username/Email and Password to Login!</h1>
          <div className="fields">
            <span>Username/Email:</span>
            <input name="username" type="text" onChange={this.onUserChange} />
            <span>Password:</span>
            <input name="password" type="password" onChange={this.onPassChange} />
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
            <span data-page="Home" disabled={isLoading} role="link" onClick={this.onLinkPress}>
              Forgot Password?</span>
            <span data-page="Register" disabled={isLoading} role="link" onClick={this.onLinkPress}>
              New here? Go Register!</span>
          </div>
        </form>
      </main>
    );
  }

  onUserChange = (ev) => this.setState({ username: ev.currentTarget.value });
  onPassChange = (ev) => this.setState({ pass: ev.currentTarget.value });
  onLinkPress = (ev) => this.context.changeMainPage(ev.currentTarget.getAttribute("data-page"));

  onLogin = (ev) => {
    ev.preventDefault();
    this.setState({ isLoading: true }, this.loginUser);
  };

  loginUser = async() => {
    try {
      const { username, pass } = this.state;
      const { updateUser, changeMainPage } = this.context;
      const successStatus = 200;

      let res = await fetch(`${getServerURL()}/login`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          pass,
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
        console.log(res);
      }
    } catch (err) {
      console.log("___________ERROR___________\n", err.message);
    } finally {
      this.setState({ isLoading: false });
    }
  };
}

export default Login;
