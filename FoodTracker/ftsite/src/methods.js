import svData from "./svData.json";


const dateToStr = (dateObj) => `${dateObj.getFullYear()}-`
+ `${dateObj.getMonth() + 1 > 9 ? (dateObj.getMonth() + 1).toString() : `0${(dateObj.getMonth() + 1).toString()}`}-`
+ `${dateObj.getDate() > 9 ? dateObj.getDate().toString() : `0${dateObj.getDate().toString()}`}`;

const getServerURL = () =>
  svData.serverLink;
// return "http://localhost:3001";

export { dateToStr, getServerURL };
