import React from 'react';
import Header from './Sections/Header';
import Nav from './Sections/Nav';
import Main from './Sections/Main';
import Footer from './Sections/Footer';

const refs = {
    main: React.createRef(),
    footer: React.createRef(),
    header: React.createRef()
};

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nrClicks: 0,



            user: {
                userid: 0,
                username: "Guest",
                email: "guest@nomail.none",
                firstname: "John",
                lastname: "Doe",
                dob: new Date(),
                sex: 1,
                describe: "placeholder",
                pic: "SitePics/profileEmpty.png",
                default_meals: 'Breakfast,Lunch,Dinner',
                access: "Guest"
            }
        };
    }

    updateUser = (res) => {
        this.setState({
            user: res
        });
        console.log(this.state.user);
    };

    onIncClicks = () => {
        this.setState({
            nrClicks: this.state.nrClicks + 1
        });
        refs.footer.current.setState({
            nrClicks: this.state.nrClicks
        });
    };

    render = () => {
        return (
            [
                <Header ref={refs.header} user={this.state.user} navClick={(navText) => refs.main.current.changePage(navText)} key="H" />,
                <Nav navClick={(navText) => refs.main.current.changePage(navText)} key="N" />,
                <Main ref={refs.main} app={this} incClicks={this.onIncClicks} page="Login" key="M" />,
                <Footer ref={refs.footer} key="F" />
            ]
        );
    };
}

export default App;