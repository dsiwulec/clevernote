import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createNewNotebook, getAllNotebooks } from '../../store/notebook';
import './NewNotebookForm.css'

const NewNotebookForm = ({ showNewNotebookModal, setShowNewNotebookModal }) => {
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const [nameCharCount, setNameCharCount] = useState(0)
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (showNewNotebookModal) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
            setShowNewNotebookModal(false)
        }
    }, [showNewNotebookModal, setShowNewNotebookModal])

    const onSubmit = async (e) => {
        e.preventDefault();

        const newNotebook = await dispatch(createNewNotebook(name))
            .catch(async (response) => {
                const data = await response.json();

                if (data && data.errors) setErrors(Object.values(data.errors));
            });

        if (newNotebook) {
            setShowNewNotebookModal(false)
        }

    };

    const updateName = (e) => {
        setName(e.target.value);
        setNameCharCount(e.target.value.length)
    };

    return (
        <form id='new-notebook-form' onSubmit={onSubmit}>
            <div id='new-notebook-header'>Create new notebook</div>
            <div id='new-notebook-text'>Notebooks are useful for grouping notes around a common topic. They can be private or shared.</div>
            <div id='input-container'>
                <label htmlFor="name" id='new-notebook-name-label'>Name</label>
                <div className='new-notebook-input-container'>
                    <input
                        className='new-notebook-input'
                        name='name'
                        type='text'
                        placeholder='Notebook name'
                        value={name}
                        onChange={updateName}
                        required
                        maxLength={100}
                    />
                    <div className='char-count'>{nameCharCount}/100</div>
                </div>
            </div>
            <div id='new-notebook-footer'>
                <button className='cancel-button' type='button' onClick={() => setShowNewNotebookModal(false)}>Cancel</button>
                <button className='create-button' type="submit">Create</button>
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

export default NewNotebookForm;
