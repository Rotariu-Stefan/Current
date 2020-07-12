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

  passRegex = /^(?=.*?\d)(?=.*?[a-zA-Z]).+$/;

  UNSAFE_componentWillMount = () => {
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
  };

  render = () => {
    const { username, email, firstname, lastname, dob, sex, describe, pic, diet, warning, isLoading } = this.state;

    return (
      <main className="mainUserForm boxShow">
        <form className="userform subblock boxShow" onReset={this.cancelChangeProfile} onSubmit={this.onChangeProfile}>
          <h1 className="lineDown">Profile Info</h1>
          <div className="fields">
            <span>Username:</span>
            <input minLength="3" name="username" type="text" value={username} onChange={(ev) => this.setState({ username: ev.currentTarget.value })} />
            <span className={`warning${warning === "username" ? "" : " hidden"}`}>Username is Already Taken!</span>
            <span>Email:</span>
            <input name="email" type="text" value={email} onChange={(ev) => this.setState({ email: ev.currentTarget.value })} />
            <span className={`warning${warning === "email" ? "" : " hidden"}`}>Email is Already Taken!</span>
            <div className="personal">
              <div>
                <img alt="[NO PIC]" src={`UserPics/${pic}`} /><br />
                <button className="ftButton" disabled={isLoading} onClick={this.browseUserPic}>Browse</button>
              </div>
              <div>
                <span>Description:</span><br />
                <textarea placeholder="Say who you are in a few short phrases.." value={describe} onChange={(ev) => this.setState({ describe: ev.currentTarget.value })} />
              </div>
            </div>
            <span>First Name:</span>
            <input name="firstname" type="text" value={firstname} onChange={(ev) => this.setState({ firstname: ev.currentTarget.value })} />
            <span>Last Name:</span>
            <input name="lastname" type="text" value={lastname} onChange={(ev) => this.setState({ lastname: ev.currentTarget.value })} />
            <div>
              <span>Sex:</span>
              <input checked={sex === "1"} name="sex" type="radio" value="male" onChange={(ev) => this.setState({ sex: "1" })} />
              <span>Male </span>
              <input checked={sex === "0"} name="sex" type="radio" value="female" onChange={(ev) => this.setState({ sex: "0" })} />
              <span>Female</span>
            </div>
            <span>Date Of Birth:</span>
            <input name="dob" type="date" value={dob} onChange={(ev) => this.setState({ dob: ev.currentTarget.value })} />
            <span className={`warning${warning === "dob" ? "" : " hidden"}`}>Incorrect date!</span>
            <span>Diet Plans:</span>
            <select value={diet ? diet : "none"} onChange={(ev) => this.setState({ diet: (ev.currentTarget.value === "none" ? null : ev.currentTarget.value) })}>
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
            <input minLength="8" name="passnow" type="password" onChange={(ev) => this.setState({ passNow: ev.currentTarget.value })} />
            <span>New Password: </span>
            <input minLength="8" name="passnew" type="password" onChange={(ev) => this.setState({ passNew: ev.currentTarget.value })} />
            <span className={`warning${warning === "passNew" ? "" : " hidden"}`}>Invalid Password!</span>
            <span className="detail">Password must be at least 8characters long and have both numbers and letters!</span>
            <span>Confirm New Password:</span>
            <input minLength="8" name="passConfirm" type="password" onChange={(ev) => this.setState({ passConfirm: ev.currentTarget.value })} />
            <span className={`warning${warning === "passConfirm" ? "" : " hidden"}`}>Passwords do Not Match!</span>
            <div className="profileButtons">
              <input className="ftButton" disabled={isLoading} type="submit" value="Save Changes" />
              <input className="ftButton" disabled={isLoading} type="reset" value="Cancel" />
            </div>
          </div>
        </form>
      </main>
    );
  };

  onChangeProfile = (ev) => {
    ev.preventDefault();
    this.setState({ isLoading: true });

    (async() => {
      const { username, email, firstname, lastname, dob, sex, describe, pic, diet } = this.state;
      const { updateUser, currentUser } = this.context;

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
            diet,
          }),
        });
        res = await res.json();

        if (res.includes("Username")) {
          this.setState({ warning: "username" });
        } else if (res.includes("Email")) {
          this.setState({ warning: "email" });
        } else if (res === "User Profile Updated!") {
          updateUser(this.state);
        } else {
          console.log(res);
        }
      }
      this.setState({ isLoading: false });
    })();
  };

  onChangePassword = (ev) => {
    ev.preventDefault();
    const { passNow, passNew, passConfirm } = this.state;
    const { currentUser } = this.context;

    if (!passNew.match(this.passRegex)) {
      this.setState({ warning: "passNew" });
    } else if (passNew !== passConfirm) {
      this.setState({ warning: "passConfirm" });
    } else {
      ev.preventDefault();
      this.setState({ isLoading: true });

      (async() => {
        try {
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
        } catch (err) {
          console.log("___________ERROR___________\n", err.message);
        } finally {
          this.setState({ isLoading: false });
        }
      })();
    }
  };

  cancelChangeProfile = (ev) => {
    ev.preventDefault();
    const { username, email, firstname, lastname, dob, sex, pic, describe, diet } = this.context.currentUser;

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
  };

  browseUserPic = (ev) => {
    ev.preventDefault();

    alert("Sorry. Not implemented yet...");
  };
}

export default Profile;
