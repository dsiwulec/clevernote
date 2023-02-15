import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateNote, updateSelected } from '../../store/note';
import { getAllNotebooks } from '../../store/notebook';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import './NoteForm.css'

const NoteForm = () => {
    const [id, setId] = useState(0)
    const [notebookId, setNotebookId] = useState(0)
    const [title, setTitle] = useState('')
    const [titleCharCount, setTitleCharCount] = useState(0)
    const [text, setText] = useState('')
    const [tag, setTag] = useState(0)

    const notes = useSelector(state => Object.values(state.notes.all).filter(note => note.scratch === false))
    const tags = useSelector(state => Object.values(state.tags))
    const selectedNote = useSelector(state => state.notes.selected)

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

    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    const notebooks = useSelector(state => Object.values(state.notebooks))

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(tag)
        const data = await dispatch(updateNote({ id, notebookId, title, text: quill.getText(), bookmarked: selectedNote.bookmarked, tagId: tag }));
        if (data) {
            let errors = []
            let errorsProperties = Object.values(data)
            let errorsKeys = Object.keys(data)
            for (let i = 0; i < errorsKeys.length; i++) {
                errors.push(errorsKeys[i] + ': ' + errorsProperties[i])
            }
            setErrors(errors);
        }
    };

    useEffect(() => {
        (async function () {
            await dispatch(getAllNotebooks());
        })()
    }, [dispatch])

    const updateTitle = (e) => {
        setTitle(e.target.value);
        setTitleCharCount(e.target.value.length)
    };

    const updateText = (e) => {
        setText(e.target.value);
    };

    const updateNotebookId = (e) => {
        setNotebookId(e.target.value)
    }

    const updateTagId = (e) => {
        setTag(e.target.value)
    }

    useEffect(() => {
        if (!selectedNote) {
            (async function () {
                await dispatch(updateSelected(notes.at(-1)))
            })()
        }
        if (selectedNote && selectedNote.id && quill) {
            setId(selectedNote.id)
            setNotebookId(selectedNote.notebookId)
            if (selectedNote.tagId === null) setTag(0)
            else setTag(selectedNote.tagId)
            setTitle(selectedNote.title)
            quill.setText(selectedNote.text)
        }
    }, [selectedNote, quill, quillRef])

    useEffect(() => {
        if (quill) quill.on('text-change', (delta, oldDelta, source) => setText(quill.getText()));
    }, [quill]);

    return (
        <form id='note-form' onSubmit={onSubmit}>
            <div id='note-title-input-container'>
                <input
                    id='note-title-input'
                    name='title'
                    type='text'
                    placeholder='Title'
                    value={title}
                    onChange={updateTitle}
                    maxLength={35}
                />
                <div className='char-count'>{titleCharCount}/35</div>
            </div>
            <div id='note-text-input-container' ref={quillRef}>
                <textarea
                    id='note-text-input'
                    name='text'
                    type='text'
                    placeholder='Start writing so you never forget the important things...'
                    value={text}
                    onChange={updateText}
                />
            </div>
            <div id='note-select-fields-container'>
                {notebooks.length > 0 && <div id='notebook-select-container'>
                    <div id='assigned-to'>Assigned to:</div>
                    <select
                        id="notebook-select"
                        name='notebook'
                        value={notebookId}
                        onFocus={updateNotebookId}
                        onChange={updateNotebookId}
                    >
                        {notebooks.map(notebook => (
                            <option key={notebook.id} value={notebook.id}>{notebook.name}</option>
                        ))}
                    </select>
                </div>
                }
                {tags.length > 0 && <div id='tag-select-container'>
                    <div id='assigned-tag'>{tags.length > 0 && <i className="fa-solid fa-tag"></i>}</div>
                    <select
                        id="notebook-select"
                        name='tag'
                        value={tag}
                        onFocus={updateTagId}
                        onChange={updateTagId}
                    >
                        <option value={0}>Select a tag</option>
                        {tags.map(tag => (
                            <option key={tag.id} value={tag.id}>{tag.tag}</option>
                        ))}
                    </select>
                </div>
                }
            </div>
            <div id='note-form-footer'>
                <button id='note-form-button' type="submit">Save</button>
            </div>
            {errors.length > 0 && (
                <div id='login-errors'>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>)}
        </form>
    );
};

export default NoteForm;
