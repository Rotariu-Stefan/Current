import React from "react";

import Header from "./Sections/Header";
import Nav from "./Sections/Nav";
import Main from "./Sections/Main";
import Footer from "./Sections/Footer";
import svData from "./svData.json";


const refs = {
  main: React.createRef(),
  footer: React.createRef(),
  header: React.createRef(),
  nav: React.createRef(),
};

let app = null;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.defaultUser = {
      userid: 0,
      username: "Guest",
      email: "guest@nomail.none",
      firstname: "John",
      lastname: "Doe",
      dob: this.dateToStr(new Date()),
      sex: "1",
      describe: "placeholder",
      pic: "profileEmpty.png",
      diet: null,
      defaultmeals: "Breakfast,Lunch,Dinner",
      access: "Guest",
    };
    /* eslint-disable-next-line*/
    this.state = { currentUser: this.defaultUser };

    app = this;
  }

  render = () => (
    [
      <Header key="H" ref={refs.header} />,
      <Nav key="N" ref={refs.nav} />,
      <Main key="M" ref={refs.main} page="Home" />,
      <Footer key="F" ref={refs.footer} />,
    ]
  );

    dateToStr = (dateObj) => `${dateObj.getFullYear()}-${dateObj.getMonth() + 1 > 9 ? (dateObj.getMonth() + 1).toString() : `0${(dateObj.getMonth() + 1).toString()}`}-${dateObj.getDate() > 9 ? dateObj.getDate().toString() : `0${dateObj.getDate().toString()}`}`;

    getServerURL = () =>
      svData.serverLink
    // return "http://localhost:3001";


    updateUser = (data) => {
      const { defaultUser } = this;

      if (data === null) {
        this.setState({ currentUser: defaultUser });
        refs.header.current.updateUser(false, defaultUser.username, defaultUser.pic);
      } else {
        data.dob = this.dateToStr(new Date(data.dob));
        this.setState({ currentUser: data });
        refs.header.current.updateUser(true, data.username, data.pic);
      }
    };

    updateUserProfile = (data) => {
      const { currentUser } = this.state;

      currentUser.username = data.username;
      currentUser.email = data.email;
      currentUser.firstname = data.firstname;
      currentUser.lastname = data.lastname;
      currentUser.dob = data.dob;
      currentUser.sex = data.sex;
      currentUser.describe = data.describe;
      currentUser.pic = data.pic;
      currentUser.diet = data.diet;

      this.setState({ currentUser });
    };

    changeMainPage = (newPage) => refs.main.current.changePage(newPage);
}

export { App, app };
