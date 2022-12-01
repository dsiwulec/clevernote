import React from 'react';
import { Modal } from '../../context/Modal';
import DeleteNoteForm from './DeleteNoteForm';

function DeleteNoteModal({ noteId, showDeleteModal, setShowDeleteModal, setTitle, setText }) {

    return (
        <>
            {showDeleteModal && (
                <Modal onClose={() => setShowDeleteModal(false)}>
                    <DeleteNoteForm noteId={noteId} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} setTitle={setTitle} setText={setText} />
                </Modal>
            )}
        </>
    );
}

export default DeleteNoteModal;
