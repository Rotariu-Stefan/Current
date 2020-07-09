import React from 'react';

class TestLabel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: props.text ? props.text : "Nothing"
        };
    }

    componentDidUpdate() {  //HAPPPENS IF PROPS  CHANGE
      if (this.props.text !== this.state.text) {
        this.setState({ text: this.props.text })
      }
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
