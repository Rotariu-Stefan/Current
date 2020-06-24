import React from 'react';
import "../Css/UserForms.css";
import {app} from '../App';

//import { NavLink } from 'react-router-dom';

class Login extends React.Component{
  constructor(props) {
    super(props);

    this.state={
      warningMsg: null,
      isLoading: false
    };
  }

  onLogin = async (ev) => {
    ev.preventDefault();

    this.setState({isLoading: true});;
    (async () => {
      try {
        const inputs = document.querySelectorAll(".userform input");
        const usernameText = inputs[0].value;
        const passText = inputs[1].value;

        let res = await fetch(app.getServerURL() + "/login", {
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
          this.setState({warningMsg: res});
          else {
            app.updateUser(res);
            app.changeMainPage("Profile");
          }
        } else {
          console.log(await res.json());
        }
      } catch (err) {
        console.log("___________ERROR___________\n", err.message);
      } finally {
        this.setState({isLoading: false});
      }
    })();
  };

  render = () => {
    const {warningMsg, isLoading} = this.state;

    return (
      <main className="mainUserForm boxShow">
        <form className="userform subblock boxShow" onSubmit={this.onLogin}>
          <h1 className="lineDown">Enter Username/Email and Password to Login!</h1>
          <div className="fields">
            <span>Username/Email:</span>
            <input type="text" name="username"/>
            <span>Password:</span>
            <input type="password" name="password"/>
            <span disabled={isLoading}>
              Remember Me?
              <input type="checkbox" name="member"/>
            </span>
            <span className={warningMsg === null ? "hidden" : "warning"}>{this.state.warningMsg}</span>
            <input className="ftButton" type="submit" value="Login" disabled={isLoading}/>
          </div>
          {/*
            <div className="loglinks">
            <NavLink to="/">Forgot Password?</NavLink>
            <NavLink to="/Register">New here? Go Register!</NavLink>
          </div>
          */}
          <div className="loglinks">
            <span onClick={() => app.changeMainPage("Home")} disabled={isLoading}>Forgot Password?</span>
            <span onClick={() => app.changeMainPage("Register")} disabled={isLoading}>New here? Go Register!</span>
          </div>
        </form>
      </main>
    );
  }
}

export default Login;
