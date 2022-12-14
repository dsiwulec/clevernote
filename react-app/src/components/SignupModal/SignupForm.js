import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignupForm.css';

function SignupFormPage({ setShowSignup, setShowLogin }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstNameCharCount, setFirstNameCharCount] = useState(0)
    const [lastNameCharCount, setLastNameCharCount] = useState(0)
    const [emailCharCount, setEmailCharCount] = useState(0)
    const [passwordCharCount, setPasswordCharCount] = useState(0)
    const [confirmPasswordCharCount, setConfirmPasswordCharCount] = useState(0)
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        if (password !== confirmPassword) return setErrors(['Confirm Password field must be the same as the Password field'])

        const data = await dispatch(signUp(firstName, lastName, email, password))
        if (data) {
            let errors = []
            let errorsProperties = Object.values(data)
            let errorsKeys = Object.keys(data)
            for (let i = 0; i < errorsKeys.length; i++) {
                errors.push(errorsProperties[i])
            }
            setErrors(errors);
        }
    };

    return (
        <form id='signup-form' onSubmit={handleSubmit}>
            <div className='auth-form-logo'>
                <i className='fa-solid fa-hippo auth-form-hippo' />
                <span className='auth-form-name'>Clevernote</span>
                <span className='auth-form-header-subtext'>Remember everything important.</span>
            </div>
            <div className="input-container">
                <div className='auth-input'>
                    <input
                        placeholder="First Name"
                        type="text"
                        value={firstName}
                        onChange={(e) => {
                            setFirstName(e.target.value)
                            setFirstNameCharCount(e.target.value.length)
                        }}
                        required
                        maxLength={20}
                    />
                    <div className="char-count">{firstNameCharCount}/20</div>
                </div>
                <div className='auth-input'>
                    <input
                        placeholder="Last Name"
                        type="text"
                        value={lastName}
                        onChange={(e) => {
                            setLastName(e.target.value)
                            setLastNameCharCount(e.target.value.length)
                        }}
                        required
                        maxLength={20}
                    />
                    <div className="char-count">{lastNameCharCount}/20</div>
                </div>
                <div className='auth-input'>
                    <input
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                            setEmailCharCount(e.target.value.length)
                        }}
                        required
                        maxLength={40}
                    />
                    <div className="char-count">{emailCharCount}/40</div>
                </div>
                <div className='auth-input'>
                    <input
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            setPasswordCharCount(e.target.value.length)
                        }}
                        required
                        minLength={6}
                        maxLength={40}
                    />
                    <div className="char-count">{passwordCharCount}/40</div>
                </div>
                <div className='auth-input'>
                    <input
                        placeholder="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value)
                            setConfirmPasswordCharCount(e.target.value.length)
                        }}
                        required
                        minLength={6}
                        maxLength={40}
                    />
                    <div className="char-count">{confirmPasswordCharCount}/40</div>
                </div>
            </div>
            <div className='auth-footer'>
                <button className='auth-button' type="submit">Sign Up</button>
                <div id='login-no-account'>
                    <span>Already have an account?</span>
                    <button type='button'
                        onClick={() => {
                            setShowSignup(false)
                            setShowLogin(true)
                        }}>Login</button>
                </div>
            </div>
            {errors.length > 0 && (
                <div id='signup-errors'>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>)}
        </form>
    );
}

export default SignupFormPage;
