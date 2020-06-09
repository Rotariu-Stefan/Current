import React from "react";
import NoteView from './NoteView';
import { app } from '../App';

class Note extends React.Component {
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
            newText: ""
        };
        this.options = [];
        for (let i = -5; i <= 5; i++)
            this.options.push(<option key={i}>{i}</option>);
    }

    onEditAddNote = (isValues) => {
        if (isValues)
            this.setState({
                isEdit: true,
                isEditValues: true
            });
        else {
            this.setState({
                isEdit: true,
                isEditValues: false
            });
            this.loadNoteViews("");
        }
    };

    loadNoteViews = (searchTerms) => {
        this.setState({
            noteViews: [],
            noteViewsIsLoading: true,
            searchCounter: this.state.searchCounter + 1
        });
        const sc = this.state.searchCounter + 1;

        setTimeout(() => this.searchNoteViews(searchTerms, sc), 150);
    };

    searchNoteViews = async (searchTerms, searchCounter) => {
        if (searchCounter < this.state.searchCounter)
            return;

        let { noteViewCounter } = this.state;
        //If app.currentUser is Guest pretend it's SV
        const userId = app.state.currentUser.userid === 0 ? 1 : app.state.currentUser.userid;

        let res = await fetch(app.getServerURL() + "/dailymeals/notesearch", {
            method: "get",
            headers: {
                "content-type": "application/json",
                "userid": userId,
                "search": searchTerms
            }
        });
        res = await res.json();
        if (searchCounter < this.state.searchCounter)
            return;

        const noteViews = [];
        let first = true;
        for (let n of res)
            if (!first)
                noteViews.push(<NoteView note={n} selectedChanged={this.onSelectedNoteViewChanged} key={noteViewCounter++} />);
            else {
                noteViews.push(<NoteView note={n} signalSelect={true} selectedChanged={this.onSelectedNoteViewChanged} key={noteViewCounter++} />);
                first = false;
            }

        this.setState({
            noteViews: noteViews,
            noteViewCounter: noteViewCounter,
            noteViewsIsLoading: false
        });
    };

    onSelectedNoteViewChanged = (ev, sender) => {
        const { selectedNoteView } = this.state;

        if (sender !== selectedNoteView) {
            if (selectedNoteView)
                selectedNoteView.toggleSelected();
            sender.toggleSelected();

            this.setState({
                selectedNoteView: sender,
            });
        }
    }

    setNote = () => {
        const { isEditValues, newScore, newTitle, newText } = this.state;

        if (isEditValues) {
            this.props.updateAttach({
                score: newScore,
                title: newTitle === "" ? "Untitled" : newTitle,
                notetext: newText
            });
            this.setState({
                note: {
                    score: newScore,
                    title: newTitle === "" ? "Untitled" : newTitle,
                    notetext: newText
                },
                isEdit: false
            });
        }
        else {
            this.props.updateAttach(this.state.selectedNoteView.state.note);
            this.setState({
                note: this.state.selectedNoteView.state.note,
                isEdit: false
            });
        }
    }

    render = () => {
        const { isEdit, isEditValues, note, noteViews, noteViewsIsLoading, newScore } = this.state;
        if (this.props.isMin)
            return <hr />;

        if (isEdit) {
            return (
                <div className="noteEdit boxShow">
                    <div className="editChoices">
                        <input onChange={(ev) => this.onEditAddNote(false)} type="radio" name={this._reactInternalFiber.key + "_radio"} value="select" checked={!isEditValues} />Select
                        <input onChange={(ev) => this.onEditAddNote(true)} type="radio" name={this._reactInternalFiber.key + "_radio"} value="values" checked={isEditValues} />Values
                        <button onClick={() => { this.setState({ isEdit: false }) }}>Cancel</button>
                    </div>
                    {isEditValues
                        ? <div className="newNote">
                            <span>Score:</span>
                            <div>
                                <select onChange={(ev) => this.setState({
                                    newScore: ev.currentTarget.value
                                })} defaultValue={0}>
                                    {this.options}
                                </select>
                                <img src={`SitePics/star${newScore}.png`} alt={"S=" + (newScore)} className="scoreImg" />
                                <button onClick={this.setNote}>Apply New Note</button>
                            </div>
                            <span>Title:</span><input onChange={(ev) => this.setState({ newTitle: ev.currentTarget.value })} type="text" maxLength="50" />
                            <span>Text:</span><textarea onChange={(ev) => this.setState({ newText: ev.currentTarget.value })} maxLength="250" />
                        </div>
                        : < div className="selectNote">
                            <div className="noteSearch">
                                Search:<input onChange={(ev) => this.loadNoteViews(ev.currentTarget.value)} type="text" maxLength="100" />
                                <button onClick={this.setNote}>Select Note</button>
                            </div>
                            <div className="noteSearchArea">
                                {noteViewsIsLoading ? "LOADING..." : noteViews}
                            </div>
                        </div>}
                </div>
            );
        }
        else
            if (note) {
                const { score, title, notetext } = note;

                return (
                    <div className="note boxShow">
                        <img src={`SitePics/star${score}.png`} alt={"S=" + (score)} className="scoreImg" />
                        <img onClick={this.props.removeNote} src="SitePics/icons8-close-window-16.png"
                            alt="X" className="managerImg" />
                        <img onClick={() => this.onEditAddNote(true)} src="SitePics/icons8-edit-16.png"
                            alt="New" className="managerImg" />
                        <span className="title">{title}</span>
                        <span className="notetext">{notetext ? "--" + notetext : ""}</span>
                    </div>
                );
            }
            else
                return (
                    <div className="note boxShow">
                        No Note<img className="managerImg" src="SitePics/icons8-plus-16.png" alt="N" onClick={this.onEditAddNote} />
                    </div >
                );
    };
}

export default Note;