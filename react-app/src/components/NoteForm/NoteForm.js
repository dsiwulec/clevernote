import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateNote } from '../../store/note';
import { getAllNotebooks } from '../../store/notebook';
import './NoteForm.css'

const NoteForm = ({ id, title, setTitle, text, setText, titleCharCount, setTitleCharCount, notebookId, setNotebookId }) => {
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    const notebooks = useSelector(state => Object.values(state.notebooks))

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(updateNote({ id, notebookId, title, text }));
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
            <div id='note-text-input-container'>
                <textarea
                    id='note-text-input'
                    name='text'
                    type='text'
                    placeholder='Start writing so you never forget the important things...'
                    value={text}
                    onChange={updateText}
                />
            </div>
            {notebooks.length > 0 && <div id='notebook-select-container'>
                <i className="fa-solid fa-book select-icon" />
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
