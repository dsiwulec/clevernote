import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { deleteNote } from '../../store/note'
import './DeleteNoteForm.css'

const DeleteNoteForm = ({ noteId, showDeleteModal, setShowDeleteModal, setTitle, setText }) => {

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
            <div id="confirm-delete-header">Delete note?</div>
            <div id="confirm-delete-text">
                This action is permanent and cannot be undone.
            </div>
            <div className="delete-notebook-footer">
                <button onClick={() => setShowDeleteModal(false)} className='delete-cancel-button'>Cancel</button>
                <button onClick={async () => {
                    await dispatch(deleteNote(noteId))
                    setTitle('')
                    setText('')
                    setShowDeleteModal(false)
                }}
                    className="submit-delete-button">Delete</button>
            </div>
        </div >
    )
}

export default DeleteNoteForm;
