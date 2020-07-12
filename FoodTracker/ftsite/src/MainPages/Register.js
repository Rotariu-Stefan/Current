/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-onchange */
import React from "react";

import "../Css/UserForms.css";
import { AppContext } from "../AppContext";
import { getServerURL } from "../methods";


class Register extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.state = {
      username: null,
      email: null,
      pass: null,
      passC: null,
      firstname: null,
      lastname: null,
      dob: null,
      sex: null,
      pic: null,
      desc: null,
      diet: null,

      warning: null,
      isLoading: false,
    };
  }

  passRegex = /^(?=.*?\d)(?=.*?[a-zA-Z]).+$/;

  render = () => {
    const { sex, warning, isLoading } = this.state;

    return (
      <main className="mainUserForm boxShow">
        <form className="userform subblock boxShow" onSubmit={this.onRegister}>
          <h1 className="lineDown">Please Complete Required fields to Register</h1>
          <div className="fields">
            <span className="req">Username*:</span>
            <input name="username" pattern=".{3,}" required={true} title="3 characters minimum" type="text" onChange={(ev) => this.setState({ username: ev.currentTarget.value })} />
            <span className={`warning${warning === "username" ? "" : " hidden"}`}>Username is Already Taken!</span>
            <span className="req">Email*:</span>
            <input name="email" type="email" onChange={(ev) => this.setState({ email: ev.currentTarget.value })} />
            <span className={`warning${warning === "email" ? "" : " hidden"}`}>Email is Already Taken!</span>
            <span className="req">Password*:</span>
            <input className="pass" minLength="8" name="password" type="password" onChange={(ev) => this.setState({ pass: ev.currentTarget.value })} />
            <span className={`warning${warning === "pass" ? "" : " hidden"}`}>Invalid Password!</span>
            <span className="detail">Password must be at least 8characters long and have both numbers and letters!</span>
            <span className="req">Confirm Password*:</span>
            <input minLength="8" name="cpass" type="password" onChange={(ev) => this.setState({ passC: ev.currentTarget.value })} />
            <span className={`warning${warning === "passC" ? "" : " hidden"}`}>Passwords do Not Match!</span>
            <span>First Name:</span>
            <input name="firstname" type="text" onChange={(ev) => this.setState({ firstname: ev.currentTarget.value })} />
            <span>Last Name:</span>
            <input name="lastname" type="text" onChange={(ev) => this.setState({ lastname: ev.currentTarget.value })} />
            <span>Date Of Birth:</span>
            <input name="dob" type="date" onChange={(ev) => this.setState({ dob: ev.currentTarget.value })} />
            <span className={`warning${warning === "dob" ? "" : " hidden"}`}>Incorrect date!</span>
            <div>
              <span>Sex:</span>
              <input checked={sex === "1"} name="sex" type="radio" value="male" onChange={(ev) => this.setState({ sex: "1" })} />
              <span>Male </span>
              <input checked={sex === "0"} name="sex" type="radio" value="female" onChange={(ev) => this.setState({ sex: "0" })} />
              <span>Female</span>
            </div>
            <div className="personal">
              <div>
                <img alt="[NO PIC]" src="UserPics/profileEmpty.png" /><br />
                <button className="ftButton" disabled={isLoading} onClick={this.browseUserPic}>Browse</button>
              </div>
              <div>
                <span>Short Description:</span><br />
                <textarea placeholder="Say who you are in a few short phrases.." onChange={(ev) => this.setState({ describe: ev.currentTarget.value })} />
              </div>
            </div>
            <span>Diet Plans?</span>
            <select onChange={(ev) => this.setState({ diet: (ev.currentTarget.value === "none" ? null : ev.currentTarget.value) })}>
              <option>none</option>
              <option>Calorie Restrict</option>
              <option>Paleo</option>
              <option>Keto</option>
              <option>Mediterranian</option>
              <option>Vegetarian</option>
              <option>Vegan</option>
              <option>Carnivore</option>
              <option>Low Carb</option>
              <option>Low Fat</option>
              <option>PSMF</option>
              <option>Specific Personal Plan</option>
            </select>
            <span className="detail">-Pick a Diet from list if any of them apply to You - Can always change it later!</span>
            <span className="detail">(This Choice is simply for tracking stats - Will Not affect results &recommendations)</span>
            <input className="ftButton" disabled={isLoading} type="submit" value="Register" />
          </div>
        </form>
      </main>
    );
  };

  onRegister = (ev) => {
    ev.preventDefault();
    this.setState({ isLoading: true });

    (async() => {
      try {
        const { pass, passC, username, email, firstname, lastname, dob, sex, describe, pic, diet } = this.state;
        const { changeMainPage } = this.context;

        if (!pass.match(this.passRegex)) {
          this.setState({ warning: "pass" });
        } else if (pass !== passC) {
          this.setState({ warning: "passC" });
        } else if (dob !== "" && new Date(dob) > new Date()) {
          this.setState({ warning: "dob" });
        } else {
          let res = await fetch(`${getServerURL()}/register`, {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username,
              email,
              firstname: firstname === "" ? null : firstname,
              lastname: lastname === "" ? null : lastname,
              dob: dob === "" ? null : dob,
              sex: sex === "" ? null : sex,
              describe: describe === "" ? null : describe,
              pic: pic === "" ? null : pic,
              diet: diet === "none" ? null : diet,
              pass,
            }),
          });
          res = await res.json();

          if (res.userid) {
            changeMainPage("Login");
          } else if (res.includes("Username")) {
            this.setState({ warning: "username" });
          } else if (res.includes("Email")) {
            this.setState({ warning: "email" });
          } else {
            console.log(res);
          }
        }
      } catch (err) {
        console.log("___________ERROR___________\n", err.message);
      } finally {
        this.setState({ isLoading: false });
      }
    })();
  };

  browseUserPic = (ev) => {
    ev.preventDefault();

    alert("Sorry. Not implemented yet...");
  }
}

export default Register;
