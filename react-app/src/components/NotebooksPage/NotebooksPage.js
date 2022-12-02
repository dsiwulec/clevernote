import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as notebookActions from '../../store/notebook'
import Sidebar from '../Sidebar/Sidebar';
import NewNotebookModal from '../NewNotebookModal/NewNotebookModal';
import Actions from '../Actions/Actions';
import timeSince from '../../utilities/timeSince';
import './NotebooksPage.css'


const NotebooksPage = () => {
    const dispatch = useDispatch()
    const [showNewNotebookModal, setShowNewNotebookModal] = useState(false)

    const notebooksObject = useSelector(state => state.notebooks)
    const notebooksNumber = useSelector(state => Object.keys(state.notebooks).length)
    const notebooks = Object.values(notebooksObject)

    notebooks.sort(
        (a, b) => (new Date(a.createdAt) < new Date(b.createdAt)) ? 1 : (new Date(a.createdAt) > new Date(b.createdAt)) ? -1 : 0);

    useEffect(() => {
        (async function () {
            await dispatch(notebookActions.getAllNotebooks());
        })()
    }, [dispatch, notebooksNumber])

    return (
        <div className='main-container'>
            <div className='main-sidebar-container'>
                <Sidebar />
            </div>
            <div className='main-content-container'>
                <div id='notebooks-header-container'>
                    <div id='notebooks-overall-header' className='notebooks-content'>Notebooks</div>
                    <div id='notebooks-content-header'>
                        {notebooksNumber === 1 ?
                            <div className='notebooks-number'>{notebooksNumber} notebook</div> :
                            <div className='notebooks-number'>{notebooksNumber} notebooks</div>
                        }
                        <button id='new-notebook-button' onClick={() => setShowNewNotebookModal(true)}>
                            <i className="fa-solid fa-plus" />
                            New Notebook
                        </button>
                        {showNewNotebookModal && < NewNotebookModal showNewNotebookModal={showNewNotebookModal} setShowNewNotebookModal={setShowNewNotebookModal} />}
                    </div>
                </div>
                <div id='notebook-table-container'>
                    <div id='notebook-title-column'>
                        <div className='column-header'>TITLE</div>
                        {notebooks?.map(notebook => (
                            <NavLink to={`/notebooks/${notebook.id}/notes`} key={notebook.id} className='title-column-content'>
                                <i className="fa-solid fa-angle-right" />
                                {notebook.default === true && <i className="fa-solid fa-book-bookmark" />}
                                {notebook.default === false && <i className="fa-solid fa-book" />}
                                <span>{notebook.name}</span>
                            </NavLink>
                        ))}
                    </div>
                    <div id='notebook-owner-column'>
                        <div className='column-header'>OWNER</div>
                        {notebooks?.map(notebook => (
                            <div key={notebook.id} className='column-content'>
                                {notebook.User?.firstName} {notebook.User?.lastName}
                            </div>
                        ))}
                    </div>
                    <div id='notebook-created-column'>
                        <div className='column-header'>CREATED</div>
                        {notebooks?.map(notebook => (
                            <div key={notebook.id} className='column-content'>
                                {timeSince(notebook.createdAt)}
                            </div>
                        ))}
                    </div>
                    <div id='notebook-updated-column'>
                        <div className='column-header'>UPDATED</div>
                        {notebooks?.map(notebook => (
                            <div key={notebook.id} className='column-content'>
                                {notebook.updatedAt ?
                                    timeSince(notebook.updatedAt) :
                                    <span>–</span>}
                            </div>
                        ))}
                    </div>
                    <div id='notebook-actions-column'>
                        <div className='column-header'>ACTIONS</div>
                        {notebooks.map(notebook => (
                            <Actions key={notebook.id} notebook={notebook} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotebooksPage;
