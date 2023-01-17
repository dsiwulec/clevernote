import React from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import ScratchPad from '../ScratchPad/ScratchPad';
import './HomePage.css'


const HomePage = () => {
    const user = useSelector(state => state.session.user)

    const currentDate = new Date()
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const day = weekday[currentDate.getDay()]
    const month = months[currentDate.getMonth()]

    return (
        <div className='main-container'>
            <div className='main-sidebar-container'>
                <Sidebar />
            </div>
            <div className='main-content-container'>
                <div className='home-page-header'>
                    <div id='home-page-greeting'>
                        Hello, {user.firstName}!
                    </div>
                    <div id='home-page-date'>
                        {day}, {month} {currentDate.getDate()}, {currentDate.getFullYear()}
                    </div>
                </div>
                <div id='home-page-content-container'>
                    <div id='home-page-notes-container'>
                        <div className='home-page-notes' id='bookmarked-notes'>
                            <div className='home-page-notes-header'>BOOKMARKED NOTES</div>
                        </div>
                        <div className='home-page-notes' id='recent-notes'>
                            <div className='home-page-notes-header'>RECENT NOTES</div>
                        </div>
                    </div>
                    <ScratchPad />
                </div>
            </div>
        </div>
    )
}

export default HomePage;
