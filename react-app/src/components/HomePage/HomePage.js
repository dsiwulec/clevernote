import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './HomePage.css'


const HomePage = () => {

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

export default HomePage;
