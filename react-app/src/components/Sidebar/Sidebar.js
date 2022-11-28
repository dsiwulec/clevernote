import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './Sidebar.css'


const Sidebar = () => {
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

    return (
        <div id='sidebar-container'>
            <div id='dropdown-menu-toggle' onClick={() => setShowMenu(true)}>
                <i className="fa-solid fa-circle-user" />
                <span>{user.firstName} {user.lastName}</span>
            </div>
            {showMenu && (
                <div id='dropdown-menu-container'>
                    <div id='dropdown-menu-user-info'></div>
                    <LogoutButton />
                </div>
            )}
            <div id='sidebar-new-note-button'>
                <button></button>
            </div>
            <div id='nav-container'>
                <NavLink className='sidebar-nav-link' to={`/`} exact={true}>
                    <div className='sidebar-nav-link-icon'>
                        <i className="fa-solid fa-house sidebar-icons" />
                    </div>
                    <span>Home</span>
                </NavLink>
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
        </div>
    )
}

export default Sidebar;
