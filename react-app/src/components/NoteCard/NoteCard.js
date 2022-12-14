import React from "react";
import { useSelector } from "react-redux";
import timeSince from "../../utilities/timeSince";
import './NoteCard.css'

const NoteCard = ({ note, setNoteId, setNotebookId, setTitle, setTitleCharCount, setText }) => {

    const notebooks = useSelector(state => Object.values(state.notebooks))

    const onClick = (e) => {
        const previouslySelected = document.getElementsByClassName("selected-note")

        if (previouslySelected.length > 0) {
            previouslySelected[0].classList.remove('selected-note')
        }

        e.target.closest(".note-card-container").classList.add("selected-note")
        setNoteId(note.id)
        setTitle(note.title)
        if (note.title) setTitleCharCount(note.title.length)
        setText(note.text)
        if (note.notebookId) {
            setNotebookId(note.notebookId)
        } else {
            setNotebookId(notebooks.at(-1).id)
        }
    }

    return (
        <div className="note-card-container" onClick={onClick}>
            <div className="note-card-note-title">
                {note.title ?
                    note.title :
                    "Untitled"}
            </div>
            <div className="note-card-note-text">{note.text}</div>
            <div className="note-card-updated-at">
                {note.updatedAt ?
                    timeSince(note.updatedAt) :
                    timeSince(note.createdAt)}
            </div>
        </div>
    )
}

export default NoteCard
