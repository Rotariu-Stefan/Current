import React from "react";
import NoteView from './NoteView';
import { app } from '../App';

class Note extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            note: props.note,

            isExist: props.note ? true : false,
            isEdit: false,
            isNewAdd: false,

            noteViews: [],
            noteViewsIsLoading: true,
            noteViewCounter: 0,
            searchCounter: 0
        };
        this.options = [];
        for (let i = -5; i <= 5; i++)
            this.options.push(<option>{i}</option>);
    }

    onEditTypeChange = (ev) => {
        this.setState({
            isNewAdd: ev.currentTarget.value === "new"
        })
    };

    onAddNote = () => {
        this.setState({
            isEdit: true
        });
        this.loadNoteViews("");
    };

    loadNoteViews = (searchTerms) => {
        this.setState({
            noteViews: [],
            noteViewsIsLoading: true,
            searchCounter: this.state.searchCounter + 1
        });
        const sc = this.state.searchCounter + 1;

        setTimeout(() => this.searchNoteViews(searchTerms, sc), 250);
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
        if (searchCounter < this.state.searchCounter)       //TODO: Figure out if Necessarry !!
            return;

        const noteViews = [];
        for (let n of res)
            noteViews.push(<NoteView note={n} key={noteViewCounter++} />);

        this.setState({
            noteViews: noteViews,
            noteViewCounter: noteViewCounter,
            noteViewsIsLoading: false
        });
    };  //TODO

    render = () => {
        const { isExist, isEdit, isNewAdd, note, noteViews, noteViewsIsLoading } = this.state;

        if (isEdit) {
            return (
                <div className="note boxShow">
                    <input onChange={this.onEditTypeChange} type="radio" name="editType"
                        value="select" checked={!isNewAdd} />Select
                    <input onChange={this.onEditTypeChange} type="radio" name="editType" value="new" />New
                    <button onClick={() => { this.setState({ isEdit: false }) }}>Cancel</button>
                    {isNewAdd
                        ? <div>
                            Score:<select>
                                {this.options}
                            </select>
                            <br />Title:<input type="text" />
                            <br />Text:<input type="text" />
                            <br /><button>Add New Note</button>
                        </div>
                        : < div >
                            Search:<input onChange={(ev) => this.loadNoteViews(ev.currentTarget.value)} type="text" />
                            <br />Results:<div>
                                {noteViewsIsLoading ? "LOADING..." : noteViews}
                            </div>
                            <button>Select Note</button>
                        </div>}
                </div>
            );
        }
        else
            if (isExist) {
                const { score, title, notetext } = note;

                return (
                    <div className="note boxShow">
                        <img src="SitePics/starX.png" alt={"S=" + (score)} />
                        <div>
                            <span>{title}</span>
                            <span>{"--" + (notetext ? notetext : "<Empty>")}</span>
                        </div>
                    </div>
                );
            }
            else
                return (
                    <div className="note boxShow">
                        No Note<button onClick={this.onAddNote} >Add Note</button>
                    </div >
                );
    };
}

export default Note;