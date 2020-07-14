
import React from "react";

import { dateToStr } from "./methods";


const defaultUser = {
  userid: 0,
  username: "Guest",
  email: "guest@nomail.none",
  firstname: "John",
  lastname: "Doe",
  dob: dateToStr(new Date()),
  sex: "1",
  describe: "placeholder",
  pic: "profileEmpty.png",
  diet: null,
  defaultmeals: "Breakfast,Lunch,Dinner",
  access: "Guest",
};

const AppContext = React.createContext({
  currentUser: defaultUser,
  updateUser: null,
  updateUserProfile: null,
  changeMainPage: null,
});

export { AppContext, defaultUser };
