import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import NoteCard from '../NoteCard/NoteCard';
import NoteForm from '../EditNoteForm/NoteForm';
import { getAllNotes } from '../../store/note'
import './NotesPage.css'


const NotesPage = () => {
    const dispatch = useDispatch()

    const [noteId, setNoteId] = useState(0)
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    const notesObject = useSelector(state => state.notes)
    const notesNumber = useSelector(state => Object.keys(state.notes).length)
    const notes = Object.values(notesObject)

    useEffect(() => {
        (async function () {
            await dispatch(getAllNotes());
        })()
    }, [dispatch, notesNumber])

    return (
        <div className='main-container'>
            <div className='main-sidebar-container'>
                <Sidebar />
            </div>
            <div className='main-content-container' id='notes-main-container'>
                <div id='notes-list-container'>
                    <div id='notes-list-header'>
                        <i class="fa-solid fa-note-sticky" />
                        <div>Notes</div>
                    </div>
                    <div id='notes-list-notes-number'>{notesNumber} notes</div>
                    <div id='note-cards-list'>
                        {notes.map(note => <NoteCard note={note} setNoteId={setNoteId} setTitle={setTitle} setText={setText} />)}
                    </div>
                </div>
                <div id='note-details-container'>
                    <div id='note-details-header'></div>
                    <div id='note-details-text-container'>
                        <NoteForm
                            noteId={noteId}
                            title={title}
                            setTitle={setTitle}
                            text={text}
                            setText={setText}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotesPage;
