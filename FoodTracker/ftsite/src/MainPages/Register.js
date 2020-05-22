import React from 'react';
import "../Css/RegLog.css";

class Register extends React.Component {

    onRegister = (ev) => {
        ev.preventDefault();
    }

    render = () => {
        return (
            <main className="mainRegLog boxShow">
                <form onClick={this.onRegister} id="regform" className="subblock boxShow">
                    <h1 className="lineDown">Please Complete ALL fields to Register!</h1>
                    <div className="fields">
                        <span>Username: </span><input type="text" name="username" />
                        <span className="warning">How DARE You, Sir!</span>
                        <span>Email:</span> <input type="email" name="email" />
                        <span>Password: </span><input type="password" name="password" />
                        <span className="detail">Password must be at least 6characters long and have both numbers and letters!</span>
                        <span>Confirm Password: </span><input type="password" name="cpass" />
                        <span>First Name: </span><input type="text" name="firstname" />
                        <span>Last Name: </span><input type="text" name="lastname" />
                        <span>Date Of Birth: </span><input type="date" name="dob" />
                        <div>
                            <span>Sex: </span><input type="radio" name="sex" value="male" /><span>Male </span>
                            <input type="radio" name="sex" value="female" /><span>Female</span>
                        </div>
                        <div className="personal">
                            <div>
                                <img src="UserPics/profileEmpty.png" alt="[NO PIC]" /><br />
                                <button>Browse</button>
                            </div>
                            <div>
                                <span>Short Description:</span><br />
                                <textarea placeholder="Say who you are in a few short phrases.."></textarea>
                            </div>
                        </div>
                        <span>Diet Plans?</span>
                        <select>
                            <option>Paleo</option>
                            <option>Keto</option>
                            <option>Mediterranian</option>
                            <option>Vegan</option>
                            <option>Carnivore</option>
                            <option>Low Carb</option>
                            <option>Low Fat</option>
                            <option>PSMF</option>
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