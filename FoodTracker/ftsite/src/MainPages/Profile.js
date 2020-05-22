import React from 'react';
import "../Css/RegLog.css"; //TODO: Replace somehow! (this is just copy/pasted from register)
import { app } from '../App';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: app.state.currentUser
        };
    }

    render = () => {    //TODO: Replace somehow! (this is just copy/pasted from register)
        const { user } = this.state;

        return (
            <main className="mainRegLog boxShow">
                <div id="regform" className="subblock boxShow">
                    <h1 className="lineDown">User Profile !</h1>
                    <div className="fields">
                        <span>Username: {user.username}</span>
                        <span>Email: {user.email}</span>
                        <span>First Name: {user.firstname}</span>
                        <span>Last Name: {user.lastname}</span>
                        <span>Date Of Birth: {user.dob}</span>
                        <span>Sex: {user.sex==="1"?"Male":"Female"}</span>
                        <div className="personal">
                            <div>
                                <img src={`UserPics/${user.pic}`} alt="[NO PIC]" /><br />
                                <button>Browse</button>
                            </div>
                            <div>
                                <span>Short Description:</span><br />
                                <textarea readOnly={true} value={user.describe}></textarea>
                            </div>
                        </div>
                        <span>Meal Plans: {user.defaultmeals}</span>
                        <span>Diet Plans? </span>
                    </div>
                </div>
            </main>
        );
    };
}

export default Profile;