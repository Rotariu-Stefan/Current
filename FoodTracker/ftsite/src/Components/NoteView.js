import React from "react";


class NoteView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: props.note,
      isSelected: false,
    };
  }

    componentDidMount = () => {
      if (this.props.signalSelect) {
        this.props.selectedChanged(null, this);
      }
    };

    render = () => {
      const { isSelected, note } = this.state;
      const { score, title, notetext } = note;

      return (
        <div className={`noteView boxShow lineDown${isSelected ? " nSelected" : ""}`} onClick={(ev) => this.props.selectedChanged(ev, this)}>
          <img alt={`S=${score}`} className="scoreImg" src={`SitePics/star${score}.png`} />
          <span className="title">{title}</span>
          <span>{`--${notetext ? notetext : "<Empty>"}`}</span>
        </div>
      );

    };

    toggleSelected = () => this.setState({ isSelected: !this.state.isSelected });
}

export default NoteView;
