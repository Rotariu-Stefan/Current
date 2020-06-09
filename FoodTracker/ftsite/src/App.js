import React from 'react';
import Header from './Sections/Header';
import Nav from './Sections/Nav';
import Main from './Sections/Main';
import Footer from './Sections/Footer';
import svData from './svData.json';

const refs = {
    main: React.createRef(),
    footer: React.createRef(),
    header: React.createRef(),
    nav: React.createRef()
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
            dob: new Date(),
            sex: 1,
            describe: "placeholder",
            pic: "profileEmpty.png",
            default_meals: 'Breakfast,Lunch,Dinner',
            access: "Guest"
        };

        this.state = {
            currentUser: this.defaultUser
        };
        app = this;
    }

    getServerURL = () => {
        return svData.serverLink;
        //return "http://localhost:3001";
    }

    updateUser = (res) => {
        const { defaultUser } = this;

        if (res === null) {
            this.setState({
                currentUser: defaultUser
            });
            refs.header.current.updateUser(false, defaultUser.username, defaultUser.pic);
        }
        else {
            this.setState({
                currentUser: res
            });
            refs.header.current.updateUser(true, res.username, res.pic);
        }
    };

    changeMainPage = (newPage) => refs.main.current.changePage(newPage);

    render = () => {
        return (
            [
                <Header ref={refs.header} key="H" />,
                <Nav ref={refs.nav} key="N" />,
                <Main ref={refs.main} page="Register" key="M" />,
                <Footer ref={refs.footer} key="F" />
            ]
        );
    };
}

export { App, app };