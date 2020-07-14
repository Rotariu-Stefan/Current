/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-onchange */
import React from "react";

import "../Css/UserForms.css";
import { AppContext } from "../AppContext";
import { getServerURL } from "../methods";


class Profile extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.state = {
      passNow: "",
      passNew: "",
      passConfirm: "",

      warning: null,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setInitialState();
  }

  render() {
    const { username, email, firstname, lastname, dob, sex, describe, pic, diet, warning, isLoading } = this.state;

    return (
      <main className="mainUserForm boxShow">
        <form className="userform subblock boxShow" onReset={this.onResetChanges} onSubmit={this.onChangeProfile}>
          <h1 className="lineDown">Profile Info</h1>
          <div className="fields">
            <span>Username:</span>
            <input
              data-field="username" minLength="3" name="username" type="text" value={username}
              onChange={this.onUserValueChanged}
            />
            <span className={`warning${warning === "username" ? "" : " hidden"}`}>Username is Already Taken!</span>
            <span>Email:</span>
            <input
              data-field="email" name="email" type="text" value={email}
              onChange={this.onUserValueChanged}
            />
            <span className={`warning${warning === "email" ? "" : " hidden"}`}>Email is Already Taken!</span>
            <div className="personal">
              <div>
                <img alt="[NO PIC]" src={`UserPics/${pic}`} /><br />
                <button className="ftButton" disabled={isLoading} onClick={this.onBrowseUserPic}>Browse</button>
              </div>
              <div>
                <span>Description:</span><br />
                <textarea
                  data-field="describe" placeholder="Say who you are in a few short phrases.."
                  value={describe} onChange={this.onUserValueChanged}
                />
              </div>
            </div>
            <span>First Name:</span>
            <input
              data-field="firstname" name="firstname" type="text" value={firstname}
              onChange={this.onUserValueChanged}
            />
            <span>Last Name:</span>
            <input
              data-field="lastname" name="lastname" type="text" value={lastname}
              onChange={this.onUserValueChanged}
            />
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
            <span>Date Of Birth:</span>
            <input data-field="dob" name="dob" type="date" value={dob} onChange={this.onUserValueChanged} />
            <span className={`warning${warning === "dob" ? "" : " hidden"}`}>Incorrect date!</span>
            <span>Diet Plans:</span>
            <select data-field="diet" value={diet ? diet : "none"} onChange={this.onUserValueChanged}>
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
              <option>Specific/Personal Plan</option>
            </select>
            <div className="profileButtons">
              <input className="ftButton" disabled={isLoading} type="submit" value="Save Changes" />
              <input className="ftButton" disabled={isLoading} type="reset" value="Cancel" />
            </div>
          </div>
        </form>

        <form className="userform subblock boxShow" onSubmit={this.onChangePassword}>
          <h1 className="lineDown">Change Password</h1>
          <div className="fields">
            <span>Current Password:</span>
            <input
              data-field="passNow" minLength="8" name="passNow" type="password"
              onChange={this.onUserValueChanged}
            />
            <span>New Password: </span>
            <input
              data-field="passNew" minLength="8" name="passNew" type="password"
              onChange={this.onUserValueChanged}
            />
            <span className={`warning${warning === "passNew" ? "" : " hidden"}`}>Invalid Password!</span>
            <span className="detail">Password must be at least 8characters+ and have both numbers and letters!</span>
            <span>Confirm New Password:</span>
            <input
              data-field="passConfirm" minLength="8" name="passConfirm" type="password"
              onChange={this.onUserValueChanged}
            />
            <span className={`warning${warning === "passConfirm" ? "" : " hidden"}`}>Passwords do Not Match!</span>
            <div className="profileButtons">
              <input className="ftButton" disabled={isLoading} type="submit" value="Save Changes" />
              <input className="ftButton" disabled={isLoading} type="reset" value="Cancel" />
            </div>
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

  onResetChanges = (ev) => {
    ev.preventDefault();
    this.setInitialState();
  };

  onBrowseUserPic = (ev) => {
    ev.preventDefault();

    alert("Sorry. Not implemented yet...");
  };

  onChangeProfile = (ev) => {
    ev.preventDefault();
    this.setState({ isLoading: true }, this.changeProfile);
  };

  onChangePassword = (ev) => {
    ev.preventDefault();
    this.setState({ isLoading: true }, this.changePassword);
  };

  changeProfile = async() => {
    try {
      const { username, email, firstname, lastname, dob, sex, describe, pic, diet } = this.state;
      const { updateUserProfile, currentUser } = this.context;

      if (dob !== "" && new Date(dob) > new Date()) {
        this.setState({ warning: "dob" });
      } else {
        let res = await fetch(`${getServerURL()}/profile`, {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userid: currentUser.userid,
            username,
            email,
            firstname: firstname === "" ? null : firstname,
            lastname: lastname === "" ? null : lastname,
            dob: dob === "" ? null : dob,
            sex: sex === "" ? null : sex,
            describe: describe === "" ? null : describe,
            pic: pic === "" ? null : pic,
            diet: diet === "none" ? null : diet,
          }),
        });
        res = await res.json();

        if (res.includes("Username")) {
          this.setState({ warning: "username" });
        } else if (res.includes("Email")) {
          this.setState({ warning: "email" });
        } else if (res === "User Profile Updated!") {
          updateUserProfile(this.state);
        } else {
          console.log(res);
        }
      }
    } catch (err) {
      console.log("___________ERROR___________\n", err.message);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  changePassword = async() => {
    try {
      const { passNow, passNew, passConfirm } = this.state;
      const { currentUser } = this.context;
      const passRegex = /^(?=.*?\d)(?=.*?[a-zA-Z]).+$/;

      if (!passNew.match(passRegex)) {
        this.setState({ warning: "passNew" });
      } else if (passNew !== passConfirm) {
        this.setState({ warning: "passConfirm" });

      } else {
        let res = await fetch(`${getServerURL()}/profile/changepass`, {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userid: currentUser.userid,
            oldpass: passNow,
            newpass: passNew,
          }),
        });
        res = await res.json();
        console.log(res);
      }
    } catch (err) {
      console.log("___________ERROR___________\n", err.message);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  setInitialState() {
    const { username, email, firstname, lastname, dob, sex, describe, pic, diet } = this.context.currentUser;

    this.setState({
      username,
      email,
      firstname,
      lastname,
      dob,
      sex,
      describe,
      pic,
      diet,
    });
  }
}

export default Profile;
