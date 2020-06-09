import React from 'react';
import "../Css/RegLog.css";
import { app } from '../App';

class Register extends React.Component {
    passRegex = /^(?=.*?\d)(?=.*?[a-zA-Z]).+$/;

    constructor(props) {
        super(props);

        this.state = {
            user: "",
            email: "",
            pass: "",
            passC: "",
            fname: "",
            lname: "",
            dob: "",
            sex: null,
            pic: "",
            desc: "",
            plan: "",

            warning: null
        }
    }

    onRegister = async (ev) => {
        ev.preventDefault();
        const { pass, passC, user, email, fname, lname, dob, sex, desc, pic } = this.state;
        console.log("1");

        try {
            if (!pass.match(this.passRegex)) {
                this.setState({ warning: "pass" });
                console.log("2");
            }
            else if (pass !== passC) {
                console.log("3");
                this.setState({ warning: "passC" });
            }
            else if (dob !== "" && new Date(dob) > new Date()) {
                console.log("4");
                this.setState({ warning: "dob" });
            }
            else {
                console.log("5");
                let res = await fetch(app.getServerURL() + "/register", {
                    method: "put",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: user,
                        email: email,
                        firstname: fname,
                        lastname: lname,
                        dob: dob,
                        sex: sex ? 1 : 0,
                        describe: desc,
                        pic: pic,
                        pass: pass
                    })
                });
                res = await res.json();
                if (res.userid)
                    app.changeMainPage("Login");
                else if (res.includes("Username")) {
                    console.log("AAAAAAAAAAAA");
                    this.setState({ warning: "user" });
                }
                else if (res.includes("Email")) {
                    console.log("6");
                    this.setState({ warning: "email" });
                }
                else
                    console.log(res);
            }
        }
        catch (err) {
            console.log("___________ERROR___________\n", err.message);
        }
    }

    browseUserPic = (ev) => {
        ev.preventDefault();

        console.log("LTR");
    }

    render = () => {
        const { sex, warning } = this.state;

        return (
            <main className="mainRegLog boxShow">
                <form onSubmit={this.onRegister} id="regform" className="subblock boxShow">
                    <h1 className="lineDown">Please Complete Required fields to Register!</h1>
                    <div className="fields">
                        <span>Username: </span><input onChange={(ev) => this.setState({ user: ev.currentTarget.value })} type="text" name="username" minLength="3" />
                        <span className={"warning" + (warning === "user" ? "" : " hidden")}>Username is Already Taken!</span>
                        <span>Email:</span> <input onChange={(ev) => this.setState({ email: ev.currentTarget.value })} type="text" name="email" />
                        <span className={"warning" + (warning === "email" ? "" : " hidden")}>Email is Already Taken!</span>
                        <span>Password: </span><input onChange={(ev) => this.setState({ pass: ev.currentTarget.value })} className="pass" type="password" name="password" minLength="8" />
                        <span className={"warning" + (warning === "pass" ? "" : " hidden")}>Invalid Password!</span>
                        <span className="detail">Password must be at least 8characters long and have both numbers and letters!</span>
                        <span>Confirm Password: </span><input onChange={(ev) => this.setState({ passC: ev.currentTarget.value })} type="password" name="cpass" minLength="8" />
                        <span className={"warning" + (warning === "passC" ? "" : " hidden")}>Passwords do Not Match!</span>
                        <span>First Name*: </span><input onChange={(ev) => this.setState({ fname: ev.currentTarget.value })} type="text" name="firstname" />
                        <span>Last Name*: </span><input onChange={(ev) => this.setState({ lname: ev.currentTarget.value })} type="text" name="lastname" />
                        <span>Date Of Birth*: </span><input onChange={(ev) => this.setState({ dob: ev.currentTarget.value })} type="date" name="dob" />
                        <span className={"warning" + (warning === "dob" ? "" : " hidden")}>Incorrect date!</span>
                        <div>
                            <span>Sex*: </span>
                            <input onChange={(ev) => this.setState({ sex: true })}
                                type="radio" name="sex" value="male" checked={sex===true} /><span>Male </span>
                            <input onChange={(ev) => this.setState({ sex: false })}
                                type="radio" name="sex" value="female" checked={sex===false} /><span>Female</span>
                        </div>
                        <div className="personal">
                            <div>
                                <img src="UserPics/profileEmpty.png" alt="[NO PIC]" /><br />
                                <button onClick={this.browseUserPic} className="ftButton">Browse*</button>
                            </div>
                            <div>
                                <span>Short Description*:</span><br />
                                <textarea onChange={(ev) => this.setState({ desc: ev.currentTarget.value })} placeholder="Say who you are in a few short phrases.."></textarea>
                            </div>
                        </div>
                        <span>Diet Plans*?</span>
                        <select onChange={(ev) => this.setState({ plan: ev.currentTarget.value })}>
                            <option>-other/none</option>
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
                            <option>-Specific Personal Plan</option>
                        </select>
                        <span className="detail">-Pick a Diet from list if any of them apply to You - Can always change it later!</span>
                        <span className="detail">(This Choice is simply for tracking stats - Will Not affect results &recommendations)</span>
                        <input className="ftButton" type="submit" value="Register" />
                    </div>
                </form>
            </main>
        );
    }
}

export default Register;