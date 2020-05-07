import React from "react";

const Note = ({
    grade = 0,
    title = "Note Title",
    text = "Note text lalalaal lalalalal alaalalal lllaal lalala asdasdsd asdda asdsadssads LA!"
}) => {
    return (
        <div className="note boxShow">
            <img src="SitePics/star.png" alt={"[STAR]" + grade} />
            <div>
                <span>{title}</span>
                <span>{text}</span>
            </div>
        </div>
    );
}

export default Note;