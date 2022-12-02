import React, { useState, useEffect } from 'react';
import DeleteNotebookModal from '../DeleteNotebookModal/DeleteNotebookModal';
import EditNotebookModal from '../EditNotebookModal/EditNotebookModal';
import './Actions.css'

const Actions = ({ notebook }) => {
    const [showActions, setShowActions] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    useEffect(() => {
        if (!showActions) return;

        const closeActions = () => {
            setShowActions(false);
        };

        document.addEventListener('click', closeActions);

        return () => document.removeEventListener("click", closeActions);
    }, [showActions]);

    return (
        <div className='actions-container'>
            <button onClick={() => setShowActions(true)} className='column-content'>
                <i className="fa-solid fa-ellipsis" />
            </button>
            {showActions && (
                <div className='actions-dropdown-container'>
                    <div className='actions-dropdown'>
                        <button className="rename-notebook-button actions-button" onClick={() => setShowEditModal(true)}>
                            Rename notebook
                        </button>
                        {notebook.default === false && <button className='delete-notebook-button actions-button' onClick={() => setShowDeleteModal(true)}>
                            Delete notebook
                        </button>
                        }
                        {notebook.default === true && <button id='default-notebook-delete-button' className='delete-notebook-button actions-button' onClick={() => setShowDeleteModal(true)} title='You cannot delete your default notebook' disabled={true}>
                            Delete notebook
                        </button>
                        }
                    </div>
                </div>
            )}
            {showEditModal && <EditNotebookModal notebook={notebook} showEditModal={showEditModal} setShowEditModal={setShowEditModal} />}
            {showDeleteModal && <DeleteNotebookModal notebookId={notebook.id} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />}
        </div>
    )
}

export default Actions
