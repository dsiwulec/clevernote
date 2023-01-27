import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useQuill } from 'react-quilljs';
import Sidebar from '../Sidebar/Sidebar';
import NoteCard from '../NoteCard/NoteCard';
import NoteForm from '../NoteForm/NoteForm';
import { getNotebookNotes, updateSelected, updateNote } from '../../store/note'
import DeleteNoteModal from '../DeleteNoteModal/DeleteNoteModal';


const NotebookNotesPage = () => {
    const theme = 'snow';

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ align: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['link'],
            [{ color: [] }, { background: [] }],
            ['clean'],
        ],
        clipboard: {
            matchVisual: false,
        },
    };

    const placeholder = 'Start writing so you never forget the important things...';

    const formats = [
        'bold', 'italic', 'underline', 'strike',
        'align', 'list', 'indent', 'header',
        'link', 'color', 'background', 'clean'
    ];

    const { quill, quillRef } = useQuill({ theme, modules, formats, placeholder });

    const dispatch = useDispatch()

    const { id } = useParams()

    const notebook = useSelector(state => state.notebooks[id])
    const notes = useSelector(state => Object.values(state.notes.all).filter(note => note.scratch === false))
    const notesNumber = useSelector(state => Object.values(state.notes.all).filter(note => note.scratch === false).length)

    notes.sort(
        (a, b) => (new Date(a.createdAt) < new Date(b.createdAt)) ? 1 : (new Date(a.createdAt) > new Date(b.createdAt)) ? -1 : 0);

    const [showDeleteModal, setShowDeleteModal] = useState(false)

    useEffect(() => {
        (async function () {
            await dispatch(getNotebookNotes(id));
            await dispatch(updateSelected(notes.at(0)))
        })()
    }, [dispatch, notesNumber])

    const selectedNote = useSelector(state => state.notes.selected)

    const addBookmark = async () => {
        console.log(!selectedNote.bookmarked)
        await dispatch(updateNote({ id: selectedNote.id, notebookId: selectedNote.notebookId, title: selectedNote.title, text: selectedNote.text, bookmarked: true }))

    }

    const removeBookmark = async () => {
        console.log(!selectedNote.bookmarked)
        await dispatch(updateNote({ id: selectedNote.id, notebookId: selectedNote.notebookId, title: selectedNote.title, text: selectedNote.text, bookmarked: false }))

    }

    return (
        <div className='main-container'>
            <div className='main-sidebar-container'>
                <Sidebar />
            </div>
            <div className='main-content-container' id='notes-main-container'>
                <div id='notes-list-container'>
                    {notebook?.default === false && <div id='notes-list-header'>
                        <i className="fa-solid fa-book" />
                        <div>{notebook.name}</div>
                    </div>}
                    {notebook?.default === true && <div id='notes-list-header'>
                        <i className="fa-solid fa-book-bookmark" />
                        <div>{notebook.name}</div>
                    </div>}
                    <div id='notes-list-notes-number'>{notesNumber} notes</div>
                    <div id='note-cards-list'>
                        {notes.map(note => (
                            <NoteCard quill={quill} key={note.id} note={note} />))}
                    </div>
                </div>
                <div id='note-details-container'>
                    <div id='note-details-header'>
                        {selectedNote?.bookmarked === true ?
                            <button onClick={removeBookmark}>
                                <i className="fa-solid fa-bookmark"></i>
                            </button>
                            :
                            <button onClick={addBookmark}>
                                <i className="fa-regular fa-bookmark"></i>
                            </button>
                        }
                        {notesNumber > 0 && <button id='delete-note-button' onClick={() => setShowDeleteModal(true)}>Delete Note</button>}
                        {showDeleteModal && <DeleteNoteModal showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />}
                    </div>
                    <div id='note-details-text-container'>
                        {notesNumber > 0 && <NoteForm />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotebookNotesPage;
