import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { deleteTag } from '../../store/tag'
import './DeleteTagForm.css'

const DeleteTagForm = ({ tagId, showDeleteModal, setShowDeleteModal }) => {

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
            <div id="confirm-delete-header">Delete tag?</div>
            <div id="confirm-delete-text">
                This action is permanent and cannot be undone.
            </div>
            <div className="delete-notebook-footer">
                <button onClick={() => setShowDeleteModal(false)} className='delete-cancel-button'>Cancel</button>
                <button onClick={async () => {
                    setShowDeleteModal(false)
                    await dispatch(deleteTag(tagId))
                }}
                    className="submit-delete-button">Delete</button>
            </div>
        </div >
    )
}

export default DeleteTagForm;
