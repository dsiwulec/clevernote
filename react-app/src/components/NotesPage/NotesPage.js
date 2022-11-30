import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './NotesPage.css'


const NotesPage = () => {

    return (
        <div className='main-container'>
            <div className='main-sidebar-container'>
                <Sidebar />
            </div>
            <div className='main-content-container'>
            </div>
        </div>
    )
}

export default NotesPage;
