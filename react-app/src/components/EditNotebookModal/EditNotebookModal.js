import React from 'react';
import { Modal } from '../../context/Modal';
import EditNotebookForm from './EditNotebookForm';

function EditNotebookModal({ notebook, showEditModal, setShowEditModal }) {

    return (
        <>
            {showEditModal && (
                <Modal onClose={() => setShowEditModal(false)}>
                    <EditNotebookForm notebook={notebook} showEditModal={showEditModal} setShowEditModal={setShowEditModal} />
                </Modal>
            )}
        </>
    );
}

export default EditNotebookModal;
