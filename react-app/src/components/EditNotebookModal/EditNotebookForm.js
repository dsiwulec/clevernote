import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateNotebook, getAllNotebooks } from '../../store/notebook';
import './EditNotebookForm.css'

const EditNotebookForm = ({ notebook, showEditModal, setShowEditModal }) => {
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState(notebook.name);
    const [nameCharCount, setNameCharCount] = useState(notebook.name.length)
    const dispatch = useDispatch();

    useEffect(() => {
        if (showEditModal) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
            setShowEditModal(false)
        }
    }, [showEditModal, setShowEditModal])

    const onSubmit = async (e) => {
        e.preventDefault();

        const editedNotebook = await dispatch(updateNotebook({ id: notebook.id, name }))
            .catch(async (response) => {
                const data = await response.json();

                if (data && data.errors) setErrors(Object.values(data.errors));
            });

        if (editedNotebook) {
            setShowEditModal(false)
            dispatch(getAllNotebooks())
        }

    };

    const updateName = (e) => {
        setName(e.target.value);
        setNameCharCount(e.target.value.length)
    };

    return (
        <form id='edit-notebook-form' onSubmit={onSubmit}>
            <div id='edit-notebook-header'>Rename notebook</div>
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
                <button className='cancel-button' type='button' onClick={() => setShowEditModal(false)}>Cancel</button>
                <button className='create-button' type="submit">Continue</button>
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

export default EditNotebookForm;
