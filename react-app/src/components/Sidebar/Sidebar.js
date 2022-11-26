import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'


const Sidebar = () => {

    return (
        <div id='sidebar-container'>
            <div id='sidebar-new-note-button'>
                <button></button>
            </div>
            <div id='nav-container'>
                <NavLink to={`/`} exact={true}>
                    <i className="fa-solid fa-house" />
                    <span>Home</span>
                </NavLink>
                <NavLink to={`/notes`} exact={true}>
                    <i class="fa-solid fa-note-sticky" />
                    <span>Notes</span>
                </NavLink>
                <NavLink to={`/notebooks`} exact={true}>
                    <i class="fa-solid fa-book" />
                    <span>Notebooks</span>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar;
