import React from 'react';
import { Modal } from '../../context/Modal';
import NewNotebookForm from './NewNotebookForm';

function NewNotebookModal({ showNewNotebookModal, setShowNewNotebookModal }) {

    return (
        <>
            {showNewNotebookModal && (
                <Modal onClose={() => setShowNewNotebookModal(false)}>
                    <NewNotebookForm showNewNotebookModal={showNewNotebookModal} setShowNewNotebookModal={setShowNewNotebookModal} />
                </Modal>
            )}
        </>
    );
}

export default NewNotebookModal;
