import React from 'react';
import { Modal } from '../../context/Modal';
import TagsForm from './TagsForm';

function TagsModal({ showTags, setShowTags }) {

    return (
        <>
            {showTags && (
                <Modal onClose={() => setShowTags(false)}>
                    <TagsForm showTags={showTags} setShowTags={setShowTags} />
                </Modal>
            )}
        </>
    );
}

export default TagsModal;
