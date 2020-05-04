import React from "react";

const Note = ({ grade, title, text }) => {
    const gradeDef = 0;
    const titleDef = "Note Title";
    const textDef = "Note text lalalaal lalalalal alaalalal lllaal lalala asdasdsd asdda asdsadssads LA!";

    return (
        <div className="note boxShow">
            <img src="SitePics/star.png" alt={"[STAR]" + grade === undefined ? gradeDef : grade} />
            <label><span>{title === undefined ? titleDef : title}</span>
                {text === undefined ? textDef : text}</label>
        </div>
    );
}

export default Note;