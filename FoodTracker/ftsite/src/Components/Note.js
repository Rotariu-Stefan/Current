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
            this.options.push(<option>{i}</option>);
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
                title: newTitle,
                notetext: newText
            });
            this.setState({
                note: {
                    score: newScore,
                    title: newTitle,
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
        const { isEdit, isEditValues, note, noteViews, noteViewsIsLoading } = this.state;

        if (isEdit) {
            return (
                <div className="noteEdit boxShow">
                    <input onChange={(ev) => this.onEditAddNote(false)} type="radio" name={this._reactInternalFiber.key + "_radio"} value="select" checked={!isEditValues} />Select
                    <input onChange={(ev) => this.onEditAddNote(true)} type="radio" name={this._reactInternalFiber.key + "_radio"} value="values" checked={isEditValues} />Values
                    <button onClick={() => { this.setState({ isEdit: false }) }}>Cancel</button>
                    {isEditValues
                        ? <div>
                            Score:<select onChange={(ev) => this.setState({
                                newScore: ev.currentTarget.value
                            })} defaultValue={0}>
                                {this.options}
                            </select>
                            <br />Title:<input onChange={(ev) => this.setState({ newTitle: ev.currentTarget.value })} type="text" />
                            <br />Text:<textarea onChange={(ev) => this.setState({ newText: ev.currentTarget.value })} />
                            <button onClick={this.setNote}>Add New Note</button>
                        </div>
                        : < div >
                            Search:<input onChange={(ev) => this.loadNoteViews(ev.currentTarget.value)} type="text" />
                            <button onClick={this.setNote}>Select Note</button>
                            <div>
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
                        <img src="SitePics/starX.png" alt={"S=" + (score)} className="scoreImg" />
                        <img onClick={() => this.onEditAddNote(true)} src="PLACEHOLDER EDIT"
                            alt="New" className="managerImg" />
                        <img onClick={this.props.removeNote} src="PLACEHOLDER CLOSE"
                            alt="X" className="managerImg" />
                        <span className="title">{title}</span>
                        <span className="notetext">{"--" + (notetext ? notetext : "<Empty>")}</span>
                    </div>
                );
            }
            else
                return (
                    <div className="note boxShow">
                        No Note<button onClick={this.onEditAddNote} >Add Note</button>
                    </div >
                );
    };
}

export default Note;