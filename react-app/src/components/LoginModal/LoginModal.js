import React from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginModal({ showLogin, setShowLogin, setShowSignup }) {

    return (
        <>
            {showLogin && (
                <Modal onClose={() => setShowLogin(false)}>
                    <LoginForm setShowLogin={setShowLogin} setShowSignup={setShowSignup} />
                </Modal>
            )}
        </>
    );
}

export default LoginModal;
