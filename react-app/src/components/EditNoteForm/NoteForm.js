import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateNote } from '../../store/note';

const NoteForm = ({ id, title, setTitle, text, setText }) => {
    const [errors, setErrors] = useState([]);
    const [titleCharCount, setTitleCharCount] = useState(title.length)
    const dispatch = useDispatch();


    const onSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(updateNote({ id, title, text }));
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

    const updateTitle = (e) => {
        setTitle(e.target.value);
        setTitleCharCount(e.target.value.length)
    };

    const updateText = (e) => {
        setText(e.target.value);
    };

    return (
        <form id='note-form' onSubmit={onSubmit}>
            <div id='note-title-input'>
                <input
                    name='title'
                    type='text'
                    placeholder='Title'
                    value={title}
                    onChange={updateTitle}
                    required
                    maxLength={100}
                />
                <div className='char-count'>{titleCharCount}/100</div>
            </div>
            <div id='note-text-input'>
                <input
                    name='text'
                    type='text'
                    placeholder='Start writing so you never forget the important things'
                    value={text}
                    onChange={updateText}
                    required
                />
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
