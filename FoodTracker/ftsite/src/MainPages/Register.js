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

  render() {
    const { sex, warning, isLoading } = this.state;

    return (
      <main className="mainUserForm boxShow">
        <form className="userform subblock boxShow" onSubmit={this.onRegister}>
          <h1 className="lineDown">Please Complete Required fields to Register</h1>
          <div className="fields">
            <span className="req">Username*:</span>
            <input
              data-field="username" name="username" pattern=".{3,}" required={true}
              title="3 characters minimum" type="text" onChange={this.onUserValueChanged}
            />
            <span className={`warning${warning === "username" ? "" : " hidden"}`}>Username is Already Taken!</span>
            <span className="req">Email*:</span>
            <input data-field="email" name="email" type="email" onChange={this.onUserValueChanged} />
            <span className={`warning${warning === "email" ? "" : " hidden"}`}>Email is Already Taken!</span>
            <span className="req">Password*:</span>
            <input
              className="pass" data-field="pass" minLength="8" name="passw"
              type="password" onChange={this.onUserValueChanged}
            />
            <span className={`warning${warning === "pass" ? "" : " hidden"}`}>Invalid Password!</span>
            <span className="detail">Password must be at least 8characters and have both numbers and letters!</span>
            <span className="req">Confirm Password*:</span>
            <input data-field="passC" minLength="8" name="passC" type="password" onChange={this.onUserValueChanged} />
            <span className={`warning${warning === "passC" ? "" : " hidden"}`}>Passwords do Not Match!</span>
            <span>First Name:</span>
            <input data-field="firstname" name="firstname" type="text" onChange={this.onUserValueChanged} />
            <span>Last Name:</span>
            <input data-field="lastname" name="lastname" type="text" onChange={this.onUserValueChanged} />
            <span>Date Of Birth:</span>
            <input data-field="dob" name="dob" type="date" onChange={this.onUserValueChanged} />
            <span className={`warning${warning === "dob" ? "" : " hidden"}`}>Incorrect date!</span>
            <div>
              <span>Sex:</span>
              <input
                checked={sex === "1"} data-field="sex" name="sex" type="radio"
                value="1" onChange={this.onUserValueChanged}
              />
              <span>Male </span>
              <input
                checked={sex === "0"} data-field="sex" name="sex" type="radio"
                value="0" onChange={this.onUserValueChanged}
              />
              <span>Female</span>
            </div>
            <div className="personal">
              <div>
                <img alt="[NO PIC]" src="UserPics/profileEmpty.png" /><br />
                <button className="ftButton" disabled={isLoading} onClick={this.onBrowseUserPic}>Browse</button>
              </div>
              <div>
                <span>Short Description:</span><br />
                <textarea
                  data-field="describe" placeholder="Say who you are in a few short phrases.."
                  onChange={this.onUserValueChanged}
                />
              </div>
            </div>
            <span>Diet Plans?</span>
            <select data-field="diet" onChange={this.onUserValueChanged}>
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
            <span className="detail">-Pick a Diet from list if any of them apply to You
              - Can always change it later!</span>
            <span className="detail">(This Choice is simply for tracking stats
              - Will Not affect results &recommendations)</span>
            <input className="ftButton" disabled={isLoading} type="submit" value="Register" />
          </div>
        </form>
      </main>
    );
  }

  onUserValueChanged = (ev) => {
    const field = ev.currentTarget.getAttribute("data-field");
    const newStateObj = {};
    newStateObj[field] = ev.currentTarget.value;
    this.setState(newStateObj);
  }

  onBrowseUserPic = (ev) => {
    ev.preventDefault();
    alert("Sorry. Not implemented yet...");
  }

  onRegister = (ev) => {
    ev.preventDefault();
    this.setState({ isLoading: true }, this.registerUser);
  };

  registerUser = async() => {
    try {
      const { pass, passC, username, email, firstname, lastname, dob, sex, describe, pic, diet } = this.state;
      const { changeMainPage } = this.context;
      const passRegex = /^(?=.*?\d)(?=.*?[a-zA-Z]).+$/;

      if (!pass.match(passRegex)) {
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
  }
}

export default Register;
