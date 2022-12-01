import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import NoteCard from '../NoteCard/NoteCard';
import NoteForm from '../NoteForm/NoteForm';
import { getAllNotes } from '../../store/note'
import './NotesPage.css'
import DeleteNoteModal from '../DeleteNoteModal/DeleteNoteModal';


const NotesPage = () => {
    const dispatch = useDispatch()

    const notesObject = useSelector(state => state.notes)
    const notesNumber = useSelector(state => Object.keys(state.notes).length)
    const notes = Object.values(notesObject)
    notes.sort(
        (a, b) => (new Date(a.createdAt) < new Date(b.createdAt)) ? 1 : (new Date(a.createdAt) > new Date(b.createdAt)) ? -1 : 0);

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [noteId, setNoteId] = useState(0)
    const [notebookId, setNotebookId] = useState(0)
    const [title, setTitle] = useState('')
    const [titleCharCount, setTitleCharCount] = useState(0)
    const [text, setText] = useState('')


    useEffect(() => {
        (async function () {
            await dispatch(getAllNotes());
            if (notes[0]) {
                setTitle(notes[0].title)
                setText(notes[0].text)
                setNoteId(notes[0].id)
            }
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
                        <i className="fa-solid fa-note-sticky" />
                        <div>Notes</div>
                    </div>
                    <div id='notes-list-notes-number'>{notesNumber} notes</div>
                    <div id='note-cards-list'>
                        {notes.map(note => (
                            <NoteCard
                                key={note.id}
                                note={note}
                                setNoteId={setNoteId}
                                setTitle={setTitle}
                                setText={setText}
                                setTitleCharCount={setTitleCharCount} />))}
                    </div>
                </div>
                <div id='note-details-container'>
                    <div id='note-details-header'>
                        {notesNumber > 0 && <button id='delete-note-button' onClick={() => setShowDeleteModal(true)}>Delete Note</button>}
                        {showDeleteModal && <DeleteNoteModal noteId={noteId} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} setTitle={setTitle} setText={setText} />}
                    </div>
                    <div id='note-details-text-container'>
                        {notesNumber > 0 &&
                            <NoteForm
                                id={noteId}
                                notebookId={notebookId}
                                setNotebookId={setNotebookId}
                                title={title}
                                setTitle={setTitle}
                                titleCharCount={titleCharCount}
                                setTitleCharCount={setTitleCharCount}
                                text={text}
                                setText={setText}
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotesPage;
