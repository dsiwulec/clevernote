import React from 'react';
import { Modal } from '../../context/Modal';
import EditTagForm from './EditTagForm';

function EditTagModal({ tag, showEditModal, setShowEditModal }) {

    return (
        <>
            {showEditModal && (
                <Modal onClose={() => setShowEditModal(false)}>
                    <EditTagForm tag={tag} showEditModal={showEditModal} setShowEditModal={setShowEditModal} />
                </Modal>
            )}
        </>
    );
}

export default EditTagModal;
