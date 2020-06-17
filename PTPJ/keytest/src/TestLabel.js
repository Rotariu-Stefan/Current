import React from 'react';

class TestLabel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: props.text ? props.text : "Nothing"
        };
    }

    render = () => {
        const { text } = this.state;

        return (
            <div>
                <h1>The Text is...</h1>
                <label>{text}</label>
            </div>
        );
    }
}

export default TestLabel;