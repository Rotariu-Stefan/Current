import React from "react";

class Note extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false
        };
    }






    render = () => {
        if (this.props.note) {
            const { score, title, notetext } = this.props.note;

            return (
                <div className="note boxShow">
                    <img src="SitePics/starX.png" alt={"S=" + (score ? score : 0)} />
                    <div>
                        <span>{title ? title : "Untitled"}</span>
                        <span>{notetext ? notetext : "[Empty]"}</span>
                    </div>
                </div>
            );
        }
        else
            return (
                "No Note"//Add Note Button
        );
    }
}

export default Note;