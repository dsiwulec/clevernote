import React from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import ScratchPad from '../ScratchPad/ScratchPad';
import './HomePage.css'
import NoteCard from '../NoteCard/NoteCard';
import { useHistory } from 'react-router-dom';


const HomePage = () => {
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const recentNotes = useSelector(state => Object.values(state.notes.all).filter(note => note.scratch === false)).slice(0, 5)
    recentNotes.sort(
        (a, b) => (new Date(a.createdAt) < new Date(b.createdAt)) ? 1 : (new Date(a.createdAt) > new Date(b.createdAt)) ? -1 : 0);
    const bookmarkedNotes = useSelector(state => Object.values(state.notes.all).filter(note => note.bookmarked === true))
    bookmarkedNotes.sort(
        (a, b) => (new Date(a.createdAt) < new Date(b.createdAt)) ? 1 : (new Date(a.createdAt) > new Date(b.createdAt)) ? -1 : 0);

    const currentDate = new Date()
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const day = weekday[currentDate.getDay()]
    const month = months[currentDate.getMonth()]

    // const onClick = () => history.push('/notes')

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
                            <div id='recent-note-cards-list'>
                                {bookmarkedNotes.map(note => (
                                    <NoteCard
                                        key={note.id}
                                        note={note}
                                    />))}
                            </div>
                        </div>
                        <div className='home-page-notes' id='recent-notes'>
                            <div className='home-page-notes-header'>RECENT NOTES</div>
                            <div id='recent-note-cards-list'>
                                {recentNotes.map(note => (
                                    <NoteCard
                                        key={note.id}
                                        note={note}
                                    />))}
                            </div>
                        </div>
                    </div>
                    <ScratchPad />
                </div>
            </div>
        </div>
    )
}

export default HomePage;
