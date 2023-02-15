import React from 'react';
import { Modal } from '../../context/Modal';
import DeleteTagForm from './DeleteTagForm';

function DeleteTagModal({ tagId, showDeleteModal, setShowDeleteModal }) {

    return (
        <>
            {showDeleteModal && (
                <Modal onClose={() => setShowDeleteModal(false)}>
                    <DeleteTagForm tagId={tagId} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />
                </Modal>
            )}
        </>
    );
}

export default DeleteTagModal;
