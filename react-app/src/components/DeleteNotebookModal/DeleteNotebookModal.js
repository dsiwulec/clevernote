import React from 'react';
import { Modal } from '../../context/Modal';
import DeleteNotebookForm from './DeleteNotebookForm';

function DeleteNotebookModal({ notebookId, showDeleteModal, setShowDeleteModal }) {

    return (
        <>
            {showDeleteModal && (
                <Modal onClose={() => setShowDeleteModal(false)}>
                    <DeleteNotebookForm notebookId={notebookId} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />
                </Modal>
            )}
        </>
    );
}

export default DeleteNotebookModal;
