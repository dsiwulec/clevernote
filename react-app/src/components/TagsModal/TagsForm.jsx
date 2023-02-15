import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createNewTag } from '../../store/tag';
import TagActions from '../TagActions/TagActions';
import './TagsForm.css'

const LoginForm = ({ showTags, setShowTags }) => {
    const tags = useSelector(state => Object.values(state.tags))
    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);
    const [tag, setTag] = useState('')
    const [tagCharCount, setTagCharCount] = useState(0)
    const [showActions, setShowActions] = useState(false)

    useEffect(() => {
        if (showTags) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
            setShowTags(false)
        }
    }, [showTags, setShowTags])

    const submit = async (e) => {
        e.preventDefault();
        const newTag = await dispatch(createNewTag(tag))
            .catch(async (response) => {
                const data = await response.json();

                if (data && data.errors) setErrors(Object.values(data.errors));
            });

        if (newTag) {
            setTag('')
        }
    };

    const updateTag = (e) => {
        setTag(e.target.value);
        setTagCharCount(e.target.value.length)
    };

    return (
        <div id='tags-form'>
            <div id='tags-form-header'>
                <span>Tags</span>
            </div>
            <form id='new-tag-form' onSubmit={submit}>
                <div id='new-tag-container'>
                    <input
                        type="text"
                        placeholder='New tag...'
                        onChange={updateTag}
                        value={tag}
                        maxLength={35}
                        required
                    />
                    <button id='new-tag-button' type='submit'><i className="fa-solid fa-plus"></i></button>
                </div>
            </form>
            {tags.length > 0 &&
                <div id='tags-list-container'>
                    {tags.map(tag => (
                        <div key={tag.id} id="tag-card">
                            <NavLink to={`/notes/tags/${tag.id}`} id='tag-name' onClick={() => setShowTags(false)}>{tag.tag}</NavLink>
                            <div className='actions-container' onClick={() => setShowActions(true)}>
                                <TagActions tag={tag} setShowActions={setShowActions} showActions={showActions} />
                            </div>
                        </div>))}
                </div>
            }
        </div>
    );
};

export default LoginForm;
