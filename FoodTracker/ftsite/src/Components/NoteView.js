import React from "react";

class NoteView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            note: props.note,
            isSelected: false
        };
    }

    toggleSelected = () => this.setState({
        isSelected: !this.state.isSelected
    });

    render = () => {
        const { isSelected, note } = this.state;
        const { score, title, notetext } = note;

        return (
            <div onClick={(ev)=>this.props.selectedChanged(ev,this)} className={"noteView boxShow" + (isSelected ? " nSelected" : "")}>
                <img src={`SitePics/star${score}.png`} alt={"S=" + (score)} className="scoreImg" />
                <span>{title}</span>
                <span>{"--" + (notetext ? notetext : "<Empty>")}</span>
            </div>
        );

    };

    componentDidMount = () => {
        if (this.props.signalSelect)
            this.props.selectedChanged(null, this);
    };
}

export default NoteView;