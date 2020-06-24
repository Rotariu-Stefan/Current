import React from 'react';
import "../Css/UserForms.css"; //TODO: Replace somehow! (this is just copy/pasted from register)
import { app } from '../App';

class Profile extends React.Component {
  passRegex = /^(?=.*?\d)(?=.*?[a-zA-Z]).+$/;

  constructor(props) {
    super(props);
    const { username, email, firstname, lastname, dob, sex, describe, pic, diet } = app.state.currentUser;

    this.state = {
      username: username,
      email: email,
      firstname: firstname,
      lastname: lastname,
      dob: dob,
      sex: sex,
      describe: describe,
      pic: pic,
      diet: diet,

      passNow: "",
      passNew: "",
      passConfirm: "",

      warning: null,
      isLoading: false
    };
  }

  onChangeProfile = async (ev) => {
    ev.preventDefault();
    this.setState({
      isLoading: true
    });

    ; (async () => {
      try {
        const { username, email, firstname, lastname, dob, sex, describe, pic, diet } = this.state;
        if (dob !== "" && new Date(dob) > new Date())
        this.setState({ warning: "dob" });
        else {
          let res = await fetch(app.getServerURL() + "/profile", {
            method: "post",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              userid: app.state.currentUser.userid,
              username: username,
              email: email,
              firstname: firstname === "" ? null : firstname,
              lastname: lastname === "" ? null : lastname,
              dob: dob === "" ? null : dob,
              sex: sex === "" ? null : sex,
              describe: describe === "" ? null : describe,
              pic: pic === "" ? null : pic,
              diet: diet
            })
          });
          res = await res.json();

          if (res.includes("Username"))
          this.setState({ warning: "username" });
          else if (res.includes("Email"))
          this.setState({ warning: "email" });
          else if (res === "User Profile Updated!") {
            app.updateUserProfile(this.state);
          }
          else
          console.log(res);
        }
      }
      catch (err) {
        console.log("___________ERROR___________\n", err.message);
      }
      finally {
        this.setState({
          isLoading: false
        });
      }
    })();
  };

  cancelChangeProfile = (ev) => {
    ev.preventDefault();
    const { username, email, firstname, lastname, dob, sex, pic, describe, diet } = app.state.currentUser;

    this.setState({
      username: username,
      email: email,
      firstname: firstname,
      lastname: lastname,
      dob: dob,
      sex: sex,
      describe: describe,
      pic: pic,
      diet: diet
    });
  };

  onChangePassword = (ev) => {
    ev.preventDefault();
    const { passNow, passNew, passConfirm } = this.state;

    if (!passNew.match(this.passRegex))
    this.setState({ warning: "passNew" });
    else if (passNew !== passConfirm)
    this.setState({ warning: "passConfirm" });
    else {
      ev.preventDefault();
      this.setState({
        isLoading: true
      });

      ; (async () => {
        try {
          let res = await fetch(app.getServerURL() + "/profile/changepass", {
            method: "post",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              userid: app.state.currentUser.userid,
              oldpass: passNow,
              newpass: passNew
            })
          });
          res = await res.json();
          console.log(res);
        }
        catch (err) {
          console.log("___________ERROR___________\n", err.message);
        }
        finally {
          this.setState({
            isLoading: false
          });
        }
      })();
    }
  };

  browseUserPic = (ev) => {
    ev.preventDefault();

    alert("Sorry. Not implemented yet...")
  };

  render = () => {
    const { username, email, firstname, lastname, dob, sex, describe, pic, diet, warning, isLoading } = this.state;

    return (
      <main className="mainUserForm boxShow">
        <form className="userform subblock boxShow" onSubmit={this.onChangeProfile} onReset={this.cancelChangeProfile}>
          <h1 className="lineDown">Profile Info</h1>
          <div className="fields">
            <span>Username:</span>
            <input onChange={(ev) => this.setState({ username: ev.currentTarget.value })} type="text" name="username" value={username} minLength="3" />
            <span className={"warning" + (warning === "username" ? "" : " hidden")}>Username is Already Taken!</span>
            <span>Email:</span>
            <input onChange={(ev) => this.setState({ email: ev.currentTarget.value })} type="text" name="email" value={email} />
            <span className={"warning" + (warning === "email" ? "" : " hidden")}>Email is Already Taken!</span>
            <div className="personal">
              <div>
                <img src={"UserPics/" + pic} alt="[NO PIC]" /><br />
                <button className="ftButton" onClick={this.browseUserPic} disabled={isLoading}>Browse</button>
              </div>
              <div>
                <span>Description:</span><br />
                <textarea onChange={(ev) => this.setState({ describe: ev.currentTarget.value })} value={describe} placeholder="Say who you are in a few short phrases.."></textarea>
              </div>
            </div>
            <span>First Name:</span>
            <input onChange={(ev) => this.setState({ firstname: ev.currentTarget.value })} type="text" name="firstname" value={firstname} />
            <span>Last Name:</span>
            <input onChange={(ev) => this.setState({ lastname: ev.currentTarget.value })} type="text" name="lastname" value={lastname} />
            <div>
              <span>Sex:</span>
              <input onChange={(ev) => this.setState({ sex: "1" })} type="radio" name="sex" value="male" checked={sex === "1"} />
              <span>Male </span>
              <input onChange={(ev) => this.setState({ sex: "0" })} type="radio" name="sex" value="female" checked={sex === "0"} />
              <span>Female</span>
            </div>
            <span>Date Of Birth:</span>
            <input onChange={(ev) => this.setState({ dob: ev.currentTarget.value })} type="date" name="dob" value={dob} />
            <span className={"warning" + (warning === "dob" ? "" : " hidden")}>Incorrect date!</span>
            <span>Diet Plans:</span>
            <select onChange={(ev) => this.setState({diet: (ev.currentTarget.value === "none" ? null : ev.currentTarget.value)})} value={diet ? diet : "none"}>
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
              <input className="ftButton" type="submit" value="Save Changes" disabled={isLoading} />
              <input className="ftButton" type="reset" value="Cancel" disabled={isLoading} />
            </div>
          </div>
        </form>
        
        <form className="userform subblock boxShow" onSubmit={this.onChangePassword}>
          <h1 className="lineDown">Change Password</h1>
          <div className="fields">
            <span>Current Password:</span>
            <input onChange={(ev) => this.setState({ passNow: ev.currentTarget.value })} type="password" name="passnow" minLength="8" />
            <span>New Password: </span>
            <input onChange={(ev) => this.setState({ passNew: ev.currentTarget.value })} type="password" name="passnew" minLength="8" />
            <span className={"warning" + (warning === "passNew" ? "" : " hidden")}>Invalid Password!</span>
            <span className="detail">Password must be at least 8characters long and have both numbers and letters!</span>
            <span>Confirm New Password:</span>
            <input onChange={(ev) => this.setState({ passConfirm: ev.currentTarget.value })} type="password" name="passConfirm" minLength="8" />
            <span className={"warning" + (warning === "passConfirm" ? "" : " hidden")}>Passwords do Not Match!</span>
            <div className="profileButtons">
              <input className="ftButton" type="submit" value="Save Changes" disabled={isLoading} />
              <input className="ftButton" type="reset" value="Cancel" disabled={isLoading} />
            </div>
          </div>
        </form>
      </main>
    );
  };
}

export default Profile;
