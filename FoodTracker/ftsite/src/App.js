import React from "react";

import Header from "./Sections/Header";
import Nav from "./Sections/Nav";
import Main from "./Sections/Main";
import Footer from "./Sections/Footer";
import { AppContext, defaultUser } from "./AppContext";
import { dateToStr } from "./methods";


const refs = {
  main: React.createRef(),
  footer: React.createRef(),
  header: React.createRef(),
  nav: React.createRef(),
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentUser: defaultUser };
  }

render = () => (
  <AppContext.Provider
    value={ {
      currentUser: this.state.currentUser,
      changeMainPage: this.changeMainPage,
      updateUser: this.updateUser,
    } }
  >
    <div className="layout">
      <Header key="H" ref={refs.header} />
      <Nav key="N" ref={refs.nav} />
      <Main key="M" ref={refs.main} page="Home" />
      <Footer key="F" ref={refs.footer} />
    </div>
  </AppContext.Provider>
);

  changeMainPage = (newPage) => refs.main.current.changePage(newPage);

  updateUser = (data) => {
    if (data === null) {
      this.setState({ currentUser: defaultUser });
      refs.header.current.updateUser(false);
    } else {
      data.dob = dateToStr(new Date(data.dob));
      this.setState({ currentUser: data });
      refs.header.current.updateUser(true);
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
}

export default App;
