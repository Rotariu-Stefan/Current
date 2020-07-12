/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-onchange */
import React from "react";
import PropTypes from "prop-types";

import { AppContext } from "../AppContext";
import { getServerURL } from "../methods";

import NoteView from "./NoteView";


class Note extends React.Component {
  static contextType = AppContext;
  static propTypes = {
    note: PropTypes.object.isRequired,
    updateNote: PropTypes.func.isRequired,
    isMin: PropTypes.bool,
  };

  static defaultProps = { isMin: false };
  static defaultNote = {
    score: 0,
    title: "",
    notetext: "",
  };

  constructor(props) {
    super(props);

    this.state = {
      note: props.note,
      view: "info",

      noteViewsIsLoading: true,
      selectedNoteView: null,
      noteViews: [],

      searchTerms: "",

      newNote: {
        score: 0,
        title: "",
        notetext: "",
      },
    };
    this.noteViewCounter = 0;
    this.searchCounter = 0;
  }

  componentDidUpdate() {
    this.kEYUPDATE();
  }

  render() {
    const { note, view, noteViewsIsLoading, newNote } = this.state;

    if (this.props.isMin) {
      return <hr />;
    }
    if (view === "info") {
      if (!note) {
        return (
          <div className="note boxShow">
            No Note
            <button className="managerImg16" data-view="select" onClick={this.onViewChange}>
              <img alt="N" src="SitePics/icons8-plus-16.png" />
            </button>
          </div>
        );
      } else if (note) {
        const { score, title, notetext } = note;

        return (
          <div className="note boxShow">
            <img alt={`S=${score}`} className="scoreImg" src={`SitePics/star${score}.png`} />
            <button className="managerImg16" onClick={this.onRemoveNote}>
              <img alt="X" src="SitePics/icons8-close-window-16.png" />
            </button>
            <button className="managerImg16" data-view="select" onClick={this.onViewChange}>
              <img alt="Edit" src="SitePics/icons8-edit-16.png" />
            </button>
            <span className="title">{title}</span>
            <span className="notetext">{notetext ? `--${notetext}` : ""}</span>
          </div>
        );
      }
    }
    if (view === "new") {
      return (
        <div className="noteEdit boxShow">
          {this._editChoices()}
          <div className="newNote">
            <span>Score:</span>
            <div>
              <select data-field="score" defaultValue={0} onChange={this.onNewNoteValueChange} >
                {this._scoreOptions()}
              </select>
              <img alt={`S=${newNote.score}`} className="scoreImg" src={`SitePics/star${newNote.score}.png`} />
              <button onClick={this.onSetNewNote}>Apply New Note</button>
            </div>
            <span>Title:</span>
            <input data-field="title" maxLength="50" type="text" onChange={this.onNewNoteValueChange} />
            <span>Text:</span>
            <textarea data-field="notetext" maxLength="250" onChange={this.onNewNoteValueChange} />
          </div>
        </div>
      );
    }
    if (view === "select") {
      return (
        <div className="noteEdit boxShow">
          {this._editChoices()}
          <div className="selectNote">
            <div className="noteSearch">
              Search:<input maxLength="100" type="text" onChange={this.onSearchTermsChange} />
              <button onClick={this.onSetNewNote}>Select Note</button>
            </div>
            <div className="noteSearchArea">
              {noteViewsIsLoading ? "LOADING..." : this._getNoteViews()}
            </div>
          </div>
        </div>
      );
    }

    return "";
  }

  onSearchTermsChange = (ev) => this.setState({ searchTerms: ev.currentTarget.value },
    this.loadNoteViews);

  onNewNoteValueChange = (ev) => {
    const { newNote } = this.state;

    newNote[ev.currentTarget.getAttribute("data-field")] = ev.currentTarget.value;
    this.setState({ newNote });
  };

  onSetNewNote = () => {
    const { view, newNote, selectedNoteView } = this.state;

    if (view === "new") {
      this.props.updateNote(newNote);
      this.setState({
        note: newNote,
        view: "info",
      });
    }
    if (view === "select") {
      this.props.updateNote(selectedNoteView.state.note);
      this.setState({
        note: selectedNoteView.state.note,
        view: "info",
      });
    }
  };

  onRemoveNote = () => this.props.updateNote(null);

  onViewChange = (ev) => {
    const view = ev.currentTarget.getAttribute("data-view");
    if (view === "select") {
      this.loadNoteViews("");
    }
    this.setState({ view });
  }

  loadNoteViews = (searchParam) => {
    const searchTerms = typeof searchParam === "string" ? searchParam : searchParam.currentTarget.value;

    this.setState({
      noteViews: [],
      noteViewsIsLoading: true,
    });

    this.searchCounter += 1;
    const sc = this.searchCounter;
    const typeDelay = 200;
    setTimeout(() => this.searchNoteViews(searchTerms, sc), typeDelay);
  };

  searchNoteViews = async(searchTerms, searchCounter) => {
    if (searchCounter < this.searchCounter) {
      return;
    }

    // If app.currentUser is Guest pretend it's SV
    const userId = this.context.currentUser.userid === 0 ? 1 : this.context.currentUser.userid;
    let res = await fetch(`${getServerURL()}/dailymeals/notesearch`, {
      method: "get",
      headers: {
        "content-type": "application/json",
        "userid": userId,
        "search": searchTerms,
      },
    });
    res = await res.json();
    if (searchCounter < this.state.searchCounter) {
      return;
    }

    this.setState({
      noteViews: res,
      noteViewsIsLoading: false,
    });
  };

  updateSelectedNote = (sender) => {
    const { selectedNoteView } = this.state;

    if (sender !== selectedNoteView) {
      if (selectedNoteView) {
        selectedNoteView.toggleSelected();
      }
      sender.toggleSelected();

      this.setState({ selectedNoteView: sender });
    }
  };

  _getNoteViews = () => {
    const { noteViews } = this.state;

    this.noteViewCounter = 0;

    return noteViews.map(this._getNoteView);

  };

  _getNoteView = (note) => {
    const nv = (
      <NoteView
        key={this.noteViewCounter} note={note} signalSelect={this.noteViewCounter === 0}
        updateSelectedNote={this.updateSelectedNote}
      />);
    this.noteViewCounter += 1;

    return nv;
  };

  _scoreOptions = () => {
    const options = [];
    for (let i = -5; i <= 5; i += 1) {
      options.push(<option key={i}>{i}</option>);
    }

    return options;
  };

  _editChoices = () => {
    const { view } = this.state;

    return (
      <div className="editChoices">
        <input
          checked={view === "select"} data-view="select" name={`${this._reactInternalFiber.key}_radio`}
          type="radio" value="select" onChange={this.onViewChange}
        />Select
        <input
          checked={view === "new"} data-view="new" name={`${this._reactInternalFiber.key}_radio`}
          type="radio" value="new" onChange={this.onViewChange}
        />New
        <button data-view="info" onClick={this.onViewChange}>
          Cancel
        </button>
      </div>
    );
  }

  kEYUPDATE() {
    if (this.props.note !== this.state.note) {
      this.setState({ note: this.props.note });
    }
  }
}

export default Note;
