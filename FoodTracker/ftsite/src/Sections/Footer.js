import React from 'react';

class Footer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            nrClicks: 0,
        }
}
    render = () => {
        return (
            <footer className="subblock boxShow">
                <h3 id="author">Nr. of Nav Clicks: {this.state.nrClicks} --Made by Rotariu Stefan<sub> - StravoS</sub></h3>
            </footer>
        );
    }
}

export default Footer;