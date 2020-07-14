import React from "react";

import Header from "./Sections/Header";
import Nav from "./Sections/Nav";
import Main from "./Sections/Main";
import Footer from "./Sections/Footer";
import { AppContext, defaultUser } from "./AppContext";
import { dateToStr } from "./methods";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: defaultUser,
      main: null,
      footer: null,
      header: null,
      nav: null,
    };
  }

  render() {
    return (
      <AppContext.Provider
        value={ {
          currentUser: this.state.currentUser,
          updateUser: this.updateUser,
          updateUserProfile: this.updateUserProfile,
          changeMainPage: this.changeMainPage,
        } }
      >
        <div className="layout">
          <Header key="H" ref={this.headerRef} />
          <Nav key="N" ref={this.navRef} />
          <Main key="M" ref={this.mainRef} page="Home" />
          <Footer key="F" ref={this.footerRef} />
        </div>
      </AppContext.Provider>
    );
  }

  headerRef = (node) => this.setState({ header: node });
  navRef = (node) => this.setState({ nav: node });
  mainRef = (node) => this.setState({ main: node });
  footerRef = (node) => this.setState({ footer: node });
  changeMainPage = (newPage) => this.state.main.changePage(newPage);

  updateUser = (data) => {
    if (data === null) {
      this.setState({ currentUser: defaultUser });
      this.state.header.updateUser(false);
    } else {
      data.dob = dateToStr(new Date(data.dob));
      this.setState({ currentUser: data });
      this.state.header.updateUser(true);
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
