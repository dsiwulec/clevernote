import React from "react";
import { useDispatch, useSelector } from "react-redux";
import timeSince from "../../utilities/timeSince";
import { updateSelected } from "../../store/note";
import './NoteCard.css'
import { useHistory } from "react-router-dom";

const NoteCard = ({ note }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const notebooks = useSelector(state => Object.values(state.notebooks))
    const selectedNote = useSelector(state => state.notes.selected)

    const onClick = async (e) => {
        const previouslySelected = document.getElementsByClassName("selected-note")

        if (previouslySelected.length > 0) {
            previouslySelected[0].classList.remove('selected-note')
        }

        e.target.closest(".note-card-container").classList.add("selected-note")

        await dispatch(updateSelected(note))

        if (window.location.pathname === '/') history.push('/notes')
    }

    return (
        <>
            {note?.id === selectedNote?.id ?
                <div className="note-card-container selected-note" onClick={onClick}>
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
                :
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
            }
        </>
    )
}

export default NoteCard
