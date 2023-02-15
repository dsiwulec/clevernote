import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import EditTagModal from '../EditTagModal/EditTagModal'
import DeleteTagModal from '../DeleteTagModal/DeleteTagModal';
import './TagActions.css'

const TagActions = ({ tag }) => {
    const [showActions, setShowActions] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    useEffect(() => {
        if (!showActions) return;

        const closeActions = (e) => {
            e.stopPropagation()
            if (!e.target.closest(".actions-container")) {
                setShowActions(false);
            }
        };

        document.addEventListener('click', closeActions);

        return () => document.removeEventListener("click", closeActions);
    }, [showActions]);

    return (
        <div className='actions-container'>
            <div onClick={() => setShowActions(true)} >
                <i className="fa-solid fa-ellipsis" />
            </div>
            {showActions && (
                <div className='actions-dropdown-container'>
                    <div className='actions-dropdown'>
                        <button className="rename-notebook-button actions-button" onClick={() => {
                            setShowActions(false)
                            setShowEditModal(true)
                        }}>
                            Edit Tag
                        </button>
                        <button className='delete-notebook-button actions-button' onClick={() => setShowDeleteModal(true)}>
                            Delete Tag
                        </button>
                    </div>
                </div>
            )}
            {showEditModal && <EditTagModal tag={tag} showEditModal={showEditModal} setShowEditModal={setShowEditModal} />}
            {showDeleteModal && <DeleteTagModal tagId={tag.id} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />}
        </div>
    )
}

export default TagActions
