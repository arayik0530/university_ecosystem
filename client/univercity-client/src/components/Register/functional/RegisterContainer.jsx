import React, {useRef, useState} from 'react';
import {RegisterUi} from '../ui/RegisterUi';
import {makeStyles} from "tss-react/mui";
import {useDispatch} from 'react-redux';
import {register} from '../../../redux/actions/user/userActions';

const useStyles = makeStyles()({
    root: {
        transform: 'translate(-50% , -50%)',
        border: '0.5px solid #1540AE',
        boxShadow: '0 0 7px #5984F2',
        borderRadius: 7,
        padding: '15px',
        width: 'max-content',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: '20%',

        '& > *': {
            margin: '8px',
            width: '25ch',
        },
    },
    LogInButton: {
        margin: 'auto',
        border: '1px solid #C4C4C4',
        '& > span': {
            color: '#2196F3 !important'
        }
    }
});


export const RegisterContainer = () => {
    const {classes} = useStyles();
    const dispatch = useDispatch();

    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const [errorMessage, setErrorMessage] = useState('');

    const isPasswordMatch = (password, confirmPassword) => {
        return password === confirmPassword;
    };

    const isPasswordComplex = (password) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/; // Requires at least one letter, one number,
                                                                        // and at least 6 characters
        return passwordRegex.test(password);
    };

    const isEmailValid = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        let valid = true;

        if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            setErrorMessage('All fields are required.');
            valid = false;
        } else if (!isEmailValid(email)) {
            setErrorMessage('Please enter a valid email address.');
            valid = false;
        } else if (!isPasswordComplex(password)) {
            setErrorMessage('Password must be at least 6 characters long and contain at least one letter and one number.');
            valid = false;
        } else if (!isPasswordMatch(password, confirmPassword)) {
            setErrorMessage('Passwords do not match.');
            valid = false;
        } else {
            setErrorMessage('');
        }

        if (valid) {
            dispatch(register({email, firstName, lastName, password}))
                // .then(() => navigate('/login'))
                .then(() =>
                    setErrorMessage(
                        'Registration was successfully,please check your email for the confirmation link.'))
                .catch((error) => {
                });
        }
    };

    return (
        <RegisterUi
            classes={classes}
            firstNameRef={firstNameRef}
            lastNameRef={lastNameRef}
            emailRef={emailRef}
            passwordRef={passwordRef}
            confirmPasswordRef={confirmPasswordRef}
            handleRegister={handleRegister}
            errorMessage={errorMessage}
        />
    );
};
