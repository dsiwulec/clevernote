import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { deleteNotebook } from '../../store/notebook'
import './DeleteNotebookForm.css'

const DeleteNotebookForm = ({ notebookId, showDeleteModal, setShowDeleteModal }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        if (showDeleteModal) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [showDeleteModal])


    return (
        <div id="delete-notebook-form">
            <div id="confirm-delete-header">Delete notebook?</div>
            <div id="confirm-delete-text">
                Any notes in the notebook will be moved to Trash. This cannot be undone.
            </div>
            <div className="delete-notebook-footer">
                <button onClick={() => setShowDeleteModal(false)} className='delete-cancel-button'>Cancel</button>
                <button onClick={() => dispatch(deleteNotebook(notebookId))} className="submit-delete-button">Delete</button>
            </div>
        </div>
    )
}

export default DeleteNotebookForm;
