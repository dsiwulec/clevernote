import React, { useState } from 'react';
import LoginModal from '../LoginModal/LoginModal';
import SignupModal from '../SignupModal/SignupModal';
import DemoUserButton from '../auth/DemoUserButton'
import './SplashPage.css'


const SplashPage = () => {
    const [showLogin, setShowLogin] = useState(false)
    const [showSignup, setShowSignup] = useState(false)

    return (
        <div id='splash-page-container'>
            <div id='splash-page-header'>
                <div id='splash-logo'>
                    <i className="fa-solid fa-hippo" />
                    <span>Clevernote</span>
                </div>
                <div id='header-auth'>
                    <DemoUserButton />
                    <button id='splash-login-button' onClick={() => setShowLogin(true)}>Log In</button>
                </div>
            </div>
            <div id='splash-text'>
                <h1>Tame your work, organize your life</h1>
                <h2>Remember everything and tackle any project with your notes, tasks, and schedule all in one place.</h2>
                <button id='splash-signup-button' onClick={() => setShowSignup(true)}>Sign up for free</button>
                <button id='splash-login-under-signup' onClick={() => setShowLogin(true)}>Already have an account? Log in</button>
            </div>
            <div id='splash-image-container'>
                <div id='splash-image'>
                    <img src="https://evernote.com/c/assets/homepage-repackaging/task_hero_image@2x__en.png?db4a8657917c979a" alt='' />
                </div>
                <div id='splash-image-text'>
                    <div>
                        <p className='splash-image-header-text'>WORK ANYWHERE</p>
                        <p className='splash-image-body-text'>Keep important info handy—your notes sync automatically to all your devices.</p>
                    </div>
                    <div>
                        <p className='splash-image-header-text'>REMEMBER EVERYTHING</p>
                        <p className='splash-image-body-text'>Make notes more useful by adding text, images, audio, scans, PDFs, and documents.</p>
                    </div>
                    <div>
                        <p className='splash-image-header-text'>TURN TO-DO INTO DONE</p>
                        <p className='splash-image-body-text'>Bring your notes, tasks, and schedules together to get things done more easily.</p>
                    </div>
                    <div>
                        <p className='splash-image-header-text'>FIND THINGS FAST</p>
                        <p className='splash-image-body-text'>Get what you need, when you need it with powerful, flexible search capabilities.</p>
                    </div>
                </div>
            </div>
            {showLogin && <LoginModal showLogin={showLogin} setShowLogin={setShowLogin} setShowSignup={setShowSignup} />}
            {showSignup && <SignupModal showSignup={showSignup} setShowSignup={setShowSignup} setShowLogin={setShowLogin} />}
        </div >
    )
}

export default SplashPage;
