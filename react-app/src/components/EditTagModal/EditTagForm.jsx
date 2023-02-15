import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTag, getAllTags } from '../../store/tag';
import './EditTagForm.css'

const EditTagForm = ({ tag, showEditModal, setShowEditModal }) => {
    const [errors, setErrors] = useState([]);
    const [tagText, setTagText] = useState(tag.tag);
    const [tagCharCount, setTagCharCount] = useState(tag.tag.length)
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

        const editedTag = await dispatch(updateTag({ id: tag.id, tag: tagText }))
            .catch(async (response) => {
                const data = await response.json();

                if (data && data.errors) setErrors(Object.values(data.errors));
            });

        if (editedTag) {
            setShowEditModal(false)
            dispatch(getAllTags())
        }

    };

    const updateTagText = (e) => {
        setTagText(e.target.value);
        setTagCharCount(e.target.value.length)
    };

    return (
        <form id='edit-notebook-form' onSubmit={onSubmit}>
            <div id='edit-notebook-header'>Edit Tag</div>
            <div id='input-container'>
                <div className='new-notebook-input-container'>
                    <input
                        className='new-notebook-input'
                        name='name'
                        type='text'
                        placeholder='Tag name'
                        value={tagText}
                        onChange={updateTagText}
                        required
                        maxLength={50}
                    />
                    <div className='char-count'>{tagCharCount}/50</div>
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

export default EditTagForm;
