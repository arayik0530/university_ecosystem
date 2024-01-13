import React, {useRef, useState} from 'react';
import {LogInUi} from '../ui/LogInUi';
import {makeStyles} from '@material-ui/core/styles';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {login, userLoginSuccess} from "../../../redux/actions/user/userActions";


const useStyles = makeStyles((theme) => ({
    root: {
        // position: 'absolute',
        // left: '50%',
        // top: '40%',
        marginTop: '10%',
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

        '& > *': {
            margin: theme.spacing(1),
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
}));


export const LogInContainer = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Create refs for email and password fields
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    // State to manage error message
    const [errorMessage, setErrorMessage] = useState('');

    // Helper function to check password complexity
    const isPasswordComplex = (password) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/; // Requires at least one letter, one number, and at least 6 characters
        return passwordRegex.test(password);
    };

    // Helper function to check email format
    const isEmailValid = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    };

    // Function to handle form submission
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Get values from refs
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        let valid = true;
        // Validate email and password
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
            setErrorMessage(''); // Clear error message if validation succeeds
        }

        if(valid) {
            console.log("valid")
            // Dispatch login action with email and password
            dispatch(login({email, password}))
                .then(() => navigate('/'))
                .then(() => dispatch(userLoginSuccess(localStorage.getItem('token'))))
                .catch((error) => console.log(error));
        }
    };
    return <LogInUi classes={classes}
                    emailRef={emailRef}
                    passwordRef={passwordRef}
                    handleLogin={handleLogin}
                    errorMessage={errorMessage}
    />
}
