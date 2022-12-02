import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { createNewNote } from '../../store/note'
import LogoutButton from '../auth/LogoutButton';
import './Sidebar.css'


const Sidebar = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [showMenu, setShowMenu] = useState(false)
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);


    const newNote = async () => {
        const previouslySelected = document.getElementsByClassName("selected-note")

        if (previouslySelected.length > 0) {
            previouslySelected[0].classList.remove('selected-note')
        }

        await dispatch(createNewNote())
        history.push('/notes/')
    }


    return (
        <div id='sidebar-container'>
            <div id='dropdown-menu-toggle' onClick={() => setShowMenu(true)}>
                <i className="fa-solid fa-circle-user" />
                <span>{user.firstName} {user.lastName}</span>
            </div>
            {showMenu && (
                <div id='dropdown-menu'>
                    <div id='account-text-header'>ACCOUNT</div>
                    <div id='dropdown-menu-user-info'>
                        <i className="fa-solid fa-check" />
                        <i className="fa-solid fa-circle-user" />
                        <div id='dropdown-menu-user-email'>
                            <span>{user.firstName} {user.lastName}</span>
                            <span>{user.email}</span>
                        </div>
                    </div>
                    <LogoutButton />
                </div>
            )}
            <div id='sidebar-new-note-button-container'>
                <button id='sidebar-new-note-button' onClick={newNote}>
                    <i className="fa-solid fa-plus" />
                    <span>New Note</span>
                </button>
            </div>
            <div id='nav-container'>
                {/* <NavLink className='sidebar-nav-link' to={`/`} exact={true}>
                    <div className='sidebar-nav-link-icon'>
                        <i className="fa-solid fa-house sidebar-icons" />
                    </div>
                    <span>Home</span>
                </NavLink> */}
                <NavLink className='sidebar-nav-link' to={`/notes`} exact={true}>
                    <div className='sidebar-nav-link-icon'>
                        <i className="fa-solid fa-note-sticky sidebar-icons" />
                    </div>
                    <span>Notes</span>
                </NavLink>
                <NavLink className='sidebar-nav-link' to={`/notebooks`} exact={true}>
                    <div className='sidebar-nav-link-icon'>
                        <i className="fa-solid fa-book sidebar-icons" />
                    </div>
                    <span>Notebooks</span>
                </NavLink>
            </div>
            <div id='about-links'>
                <div>David Siwulec</div>
                <a href="https://github.com/dsiwulec"><i className="fa-brands fa-github" /></a>
                <a href="https://www.linkedin.com/"><i class="fa-brands fa-linkedin-in" /></a>
            </div>
        </div>
    )
}

export default Sidebar;
