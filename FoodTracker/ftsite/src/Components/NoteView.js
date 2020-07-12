/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-onchange */
import React from "react";
import PropTypes from "prop-types";


class NoteView extends React.Component {
  static propTypes = {
    note: PropTypes.object.isRequired,
    updateSelectedNote: PropTypes.func.isRequired,
    signalSelect: PropTypes.bool,
  };

  static defaultProps = { signalSelect: false };

  constructor(props) {
    super(props);

    this.state = {
      note: props.note,
      isSelected: false,
    };
  }

  componentDidMount() {
    if (this.props.signalSelect) {
      this.props.updateSelectedNote(this);
    }
  }

  componentDidUpdate() {
    this.kEYUPDATE();
  }

  render() {
    const { isSelected, note } = this.state;
    const { score, title, notetext } = note;

    const selectedOrNot = isSelected ? " nSelected" : "";

    return (
      <div
        className={`noteView boxShow lineDown${selectedOrNot}`}
        role="menuitem" tabIndex="0" onClick={this.onNoteViewSelect}
      >
        <img alt={`S=${score}`} className="scoreImg" src={`SitePics/star${score}.png`} />
        <span className="title">{title}</span>
        <span>{`--${notetext ? notetext : "<Empty>"}`}</span>
      </div>
    );
  }

  onNoteViewSelect = () => this.props.updateSelectedNote(this);

  toggleSelected = () => this.setState({ isSelected: !this.state.isSelected });

  kEYUPDATE() {
    if (this.props.note !== this.state.note) {
      this.setState({ note: this.props.note });
    }
  }
}

export default NoteView;
