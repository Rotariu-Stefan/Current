import React from 'react';
import Header from './Sections/Header';
import Nav from './Sections/Nav';
import Main from './Sections/Main';
import Footer from './Sections/Footer';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            main: React.createRef(),
            footer: React.createRef(),
            nrClicks: 0
        }
    }

    onIncClicks = () => {
        this.setState({
            nrClicks: this.state.nrClicks + 1
        });
        this.state.footer.current.setState({
            nrClicks: this.state.nrClicks
        });
    }

    render = () => {
        return (
            [
                <Header navClick={(navText) => this.state.main.current.changePage(navText)
                } key="H" />,
                <Nav navClick={(navText) => this.state.main.current.changePage(navText)} key="N" />,
                <Main ref={this.state.main} incClicks={this.onIncClicks} page="Login" key="M" />,
                <Footer ref={this.state.footer} key="F" />
            ]
        );
    }
}

export default App;