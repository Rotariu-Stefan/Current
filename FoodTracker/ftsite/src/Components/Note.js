import React from "react";

import { AppContext } from "../AppContext";
import { getServerURL } from "../methods";

import NoteView from "./NoteView";


class Note extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.state = {
      note: props.note,

      isEdit: false,
      isEditValues: false,

      selectedNoteView: null,
      noteViews: [],
      noteViewsIsLoading: true,
      noteViewCounter: 0,
      searchCounter: 0,

      newScore: 0,
      newTitle: "",
      newText: "",
    };
    this.options = [];
    for (let i = -5; i <= 5; i += 1) {
      this.options.push(<option key={i}>{i}</option>);
    }
  }

  render() {
    const { isEdit, isEditValues, note, noteViews, noteViewsIsLoading, newScore } = this.state;
    if (this.props.isMin) {
      return <hr />;
    }

    if (isEdit) {
      return (
        <div className="noteEdit boxShow">
          <div className="editChoices">
            <input checked={!isEditValues} name={`${this._reactInternalFiber.key}_radio`} type="radio" value="select" onChange={(ev) => this.onEditAddNote(false)} />Select
            <input checked={isEditValues} name={`${this._reactInternalFiber.key}_radio`} type="radio" value="values" onChange={(ev) => this.onEditAddNote(true)} />Values
            <button
              onClick={() => {
                this.setState({ isEdit: false });
              }}
            >Cancel</button>
          </div>
          {isEditValues
            ? <div className="newNote">
              <span>Score:</span>
              <div>
                <select
                  defaultValue={0} onChange={(ev) => this.setState({ newScore: ev.currentTarget.value })}
                >
                  {this.options}
                </select>
                <img alt={`S=${newScore}`} className="scoreImg" src={`SitePics/star${newScore}.png`} />
                <button onClick={this.setNote}>Apply New Note</button>
              </div>
              <span>Title:</span><input maxLength="50" type="text" onChange={(ev) => this.setState({ newTitle: ev.currentTarget.value })} />
              <span>Text:</span><textarea maxLength="250" onChange={(ev) => this.setState({ newText: ev.currentTarget.value })} />
            </div>
            : <div className="selectNote">
              <div className="noteSearch">
                Search:<input maxLength="100" type="text" onChange={(ev) => this.loadNoteViews(ev.currentTarget.value)} />
                <button onClick={this.setNote}>Select Note</button>
              </div>
              <div className="noteSearchArea">
                {noteViewsIsLoading ? "LOADING..." : noteViews}
              </div>
            </div>}
        </div>
      );
    } else
    if (note) {
      const { score, title, notetext } = note;

      return (
        <div className="note boxShow">
          <img alt={`S=${score}`} className="scoreImg" src={`SitePics/star${score}.png`} />
          <img alt="X" className="managerImg" src="SitePics/icons8-close-window-16.png" onClick={this.onRemoveNote} />
          <img alt="New" className="managerImg" src="SitePics/icons8-edit-16.png" onClick={() => this.onEditAddNote(true)} />
          <span className="title">{title}</span>
          <span className="notetext">{notetext ? `--${notetext}` : ""}</span>
        </div>
      );
    }

    return (
      <div className="note boxShow">
        No Note<img alt="N" className="managerImg" src="SitePics/icons8-plus-16.png" onClick={this.onEditAddNote} />
      </div >
    );
  }

  onRemoveNote = () => this.props.removeNote;

  onEditAddNote = (isValues) => {
    if (isValues) {
      this.setState({
        isEdit: true,
        isEditValues: true,
      });
    } else {
      this.setState({
        isEdit: true,
        isEditValues: false,
      });
      this.loadNoteViews("");
    }
  };

  onSelectedNoteViewChanged = (ev, sender) => {
    const { selectedNoteView } = this.state;

    if (sender !== selectedNoteView) {
      if (selectedNoteView) {
        selectedNoteView.toggleSelected();
      }
      sender.toggleSelected();

      this.setState({ selectedNoteView: sender });
    }
  }

  searchNoteViews = async(searchTerms, searchCounter) => {
    if (searchCounter < this.state.searchCounter) {
      return;
    }

    let { noteViewCounter } = this.state;
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

    const noteViews = [];
    let first = true;
    for (const n of res) {
      if (!first) {
        noteViews.push(<NoteView key={noteViewCounter++} note={n} selectedChanged={this.onSelectedNoteViewChanged} />);
      } else {
        noteViews.push(<NoteView key={noteViewCounter++} note={n} selectedChanged={this.onSelectedNoteViewChanged} signalSelect={true} />);
        first = false;
      }
    }

    this.setState({
      noteViews,
      noteViewCounter,
      noteViewsIsLoading: false,
    });
  };

  loadNoteViews = (searchTerms) => {
    this.setState({
      noteViews: [],
      noteViewsIsLoading: true,
      searchCounter: this.state.searchCounter + 1,
    });
    const sc = this.state.searchCounter + 1;

    setTimeout(() => this.searchNoteViews(searchTerms, sc), 150);
  };

  setNote = () => {
    const { isEditValues, newScore, newTitle, newText } = this.state;

    if (isEditValues) {
      this.props.updateAttach({
        score: newScore,
        title: newTitle === "" ? "Untitled" : newTitle,
        notetext: newText,
      });
      this.setState({
        note: {
          score: newScore,
          title: newTitle === "" ? "Untitled" : newTitle,
          notetext: newText,
        },
        isEdit: false,
      });
    } else {
      this.props.updateAttach(this.state.selectedNoteView.state.note);
      this.setState({
        note: this.state.selectedNoteView.state.note,
        isEdit: false,
      });
    }
  }
}

export default Note;
