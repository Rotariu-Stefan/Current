import React from 'react';
import "../Css/UserForms.css"; //TODO: Replace somehow! (this is just copy/pasted from register)
import { app } from '../App';

class Profile extends React.Component {
    passRegex = /^(?=.*?\d)(?=.*?[a-zA-Z]).+$/;

    constructor(props) {
        super(props);
        const { username, email, firstname, lastname, dob, sex, pic, describe } = app.state.currentUser;

        this.state = {
            username: username,
            email: email,
            firstname: firstname,
            lastname: lastname,
            dob: dob,
            sex: sex,
            pic: pic,
            describe: describe,

            warning: null
        };
    }

    onChangeProfile = async (ev) => {
        ev.preventDefault();
        const { username, email, firstname, lastname, dob, sex, describe, pic } = this.state;

        try {
            if (dob !== "" && new Date(dob) > new Date())
                this.setState({ warning: "dob" });
            else {
                let res = await fetch(app.getServerURL() + "/register", {
                    method: "put",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: username,
                        email: email,
                        firstname: firstname ? firstname : null,
                        lastname: lastname ? lastname : null,
                        dob: dob ? dob : null,
                        sex: sex ? sex : null,
                        describe: describe ? describe : null,
                        pic: pic ? pic : null,
                    })
                });
                res = await res.json();

                if (res.includes("Username"))
                    this.setState({ warning: "username" });
                else if (res.includes("Email"))
                    this.setState({ warning: "email" });
                else if (res.userid) {
                    app.updateUserProfile(this.state);
                }
                else
                    console.log(res);
            }
        }
        catch (err) {
            console.log("___________ERROR___________\n", err.message);
        }
    };

    cancelChangeProfile = (ev) => {
        ev.preventDefault();

        console.log("CalcelProfile");
    };

    onChangePassword = (ev) => {
        ev.preventDefault();

        console.log("Passchange");
    };

    browseUserPic = (ev) => {
        ev.preventDefault();

        console.log("BrowsePic");
    };

    render = () => {
        const { username, email, firstname, lastname, dob, sex, describe, pic, warning } = this.state;

        return (
            <main className="mainRegLog boxShow">
                <form onSubmit={this.onChangeProfile} onReset={this.cancelChangeProfile} id="regform" className="subblock boxShow">
                    <h1 className="lineDown">Profile Info</h1>
                    <div className="fields">
                        <span>Username: </span>
                        <input onChange={(ev) => this.setState({ user: ev.currentTarget.value })} type="text" name="username" minLength="3" />
                        <span className={"warning" + (warning === "username" ? "" : " hidden")}>Username is Already Taken!</span>
                        <span>Email:</span>
                        <input onChange={(ev) => this.setState({ email: ev.currentTarget.value })} type="text" name="email" />
                        <span className={"warning" + (warning === "email" ? "" : " hidden")}>Email is Already Taken!</span>
                        <div className="personal">
                            <div>
                                <img src="UserPics/profileEmpty.png" alt="[NO PIC]" /><br />
                                <button onClick={this.browseUserPic} className="ftButton">Browse</button>
                            </div>
                            <div>
                                <span>Description:</span><br />
                                <textarea onChange={(ev) => this.setState({ describe: ev.currentTarget.value })} placeholder="Say who you are in a few short phrases.."></textarea>
                            </div>
                        </div>
                        <span>First Name: </span>
                        <input onChange={(ev) => this.setState({ firstname: ev.currentTarget.value })} type="text" name="firstname" />
                        <span>Last Name: </span>
                        <input onChange={(ev) => this.setState({ lastname: ev.currentTarget.value })} type="text" name="lastname" />
                        <div>
                            <span>Sex: </span>
                            <input onChange={(ev) => this.setState({ sex: true })}
                                type="radio" name="sex" value="male" checked={sex === true} /><span>Male </span>
                            <input onChange={(ev) => this.setState({ sex: false })}
                                type="radio" name="sex" value="female" checked={sex === false} /><span>Female</span>
                        </div>
                        <span>Date Of Birth: </span>
                        <input onChange={(ev) => this.setState({ dob: ev.currentTarget.value })} type="date" name="dob" />
                        <span className={"warning" + (warning === "dob" ? "" : " hidden")}>Incorrect date!</span>
                        <span>Diet Plans:</span>
                        <select onChange={(ev) => this.setState({ plan: ev.currentTarget.value })}>
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
                        <div className="profileButtons">
                            <input className="ftButton" type="submit" value="Save Changes" />
                            <input className="ftButton" type="reset" value="Cancel" />
                        </div>
                    </div>
                </form>

                <form onSubmit={this.onChangePassword} id="logform" className="subblock boxShow">
                    <h1 className="lineDown">Change Password</h1>
                    <div className="fields">
                        <span>Current Password: </span>
                        <input onChange={(ev) => this.setState({ pass: ev.currentTarget.value })} type="password" name="passnow" minLength="8" />
                        <span className={"warning" + (warning === "pass" ? "" : " hidden")}>Invalid Password!</span>
                        <span>New Password: </span>
                        <input onChange={(ev) => this.setState({ pass: ev.currentTarget.value })} type="password" name="passnew" minLength="8" />
                        <span className={"warning" + (warning === "pass" ? "" : " hidden")}>Invalid Password!</span>
                        <span className="detail">Password must be at least 8characters long and have both numbers and letters!</span>
                        <span>Confirm New Password: </span>
                        <input onChange={(ev) => this.setState({ passC: ev.currentTarget.value })} type="password" name="passconfirm" minLength="8" />
                        <span className={"warning" + (warning === "passC" ? "" : " hidden")}>Passwords do Not Match!</span>
                        <div className="profileButtons">
                            <input className="ftButton" type="submit" value="Save Changes" />
                            <input className="ftButton" type="reset" value="Cancel" />
                        </div>
                    </div>
                </form>

            </main>
        );
    };
}

export default Profile;