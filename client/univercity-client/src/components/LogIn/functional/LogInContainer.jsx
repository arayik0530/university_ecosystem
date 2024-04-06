import React, {useRef, useState} from 'react';
import {LogInUi} from '../ui/LogInUi';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {login, userLoginSuccess} from '../../../redux/actions/user/userActions';
import {makeStyles} from "tss-react/mui";

const useStyles = makeStyles()({
    root: {
        transform: 'translate(-50% , -50%)',
        border: '0.5px solid #1540AE',
        boxShadow: '0 0 7px #5984F2',
        borderRadius: 7,
        padding: '15px',
        width: 'max-content',
        marginLeft: '50%',
        marginRight: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: '10%',
    },
    textField: {
        margin: '8px !important',
        width: '25ch',
    },
    LogInButton: {
        margin: 'auto',
        border: '1px solid #C4C4C4',
        '& > span': {
            color: '#2196F3 !important',
        },
    },
});

export const LogInContainer = () => {
    const {classes} = useStyles();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [errorMessage, setErrorMessage] = useState('');

    const isPasswordComplex = (password) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
        return passwordRegex.test(password);
    };

    const isEmailValid = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        let valid = true;

        if (!email.trim() || !password.trim()) {
            setErrorMessage('Email and password fields cannot be empty.');
            valid = false;
        } else if (!isEmailValid(email)) {
            setErrorMessage('Please enter a valid email address.');
            valid = false;
        } else if (!isPasswordComplex(password)) {
            setErrorMessage('Password must be at least 6 characters long and contain at least one letter and one number.');
            valid = false;
        } else {
            setErrorMessage('');
        }

        if (valid) {
            dispatch(login({email, password}))
                .then(() => navigate('/'))
                .then(() => dispatch(userLoginSuccess(localStorage.getItem('token'))))
                .catch((error) => {});
        }
    };
    return (
        <LogInUi
            classes={classes}
            emailRef={emailRef}
            passwordRef={passwordRef}
            handleLogin={handleLogin}
            errorMessage={errorMessage}
        />
    );
};

export default LogInContainer;
