import React from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';

function SignupModal({ showSignup, setShowSignup, setShowLogin }) {

    return (
        <>
            {showSignup && (
                <Modal onClose={() => setShowSignup(false)}>
                    <SignupForm setShowSignup={setShowSignup} setShowLogin={setShowLogin} />
                </Modal>
            )}
        </>
    );
}

export default SignupModal;
