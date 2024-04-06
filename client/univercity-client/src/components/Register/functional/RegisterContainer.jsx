import React, {useRef} from 'react';
import {RegisterUi} from '../ui/RegisterUi';
import {makeStyles} from "tss-react/mui";
import {useDispatch} from 'react-redux';
import {setMessage} from '../../../redux/actions/message/messageActions';
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
        flexDirection: 'column',
        marginTop: '20%',
        position: 'absolute',
        left: '50%',
        display: 'flex',
        justifyContent: 'space-between',
        height: '55vh',

        '& > *': {
            marginBottom: '10px !important',
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
            dispatch(setMessage('All fields are required.', 'error'));
            valid = false;
        } else if (!isEmailValid(email)) {
            dispatch(setMessage('Please enter a valid email address.', 'error'));
            valid = false;
        } else if (!isPasswordComplex(password)) {
            dispatch(setMessage(
                'Password must be at least 6 characters long and contain at least one letter and one number.',
                'error'));
            valid = false;
        } else if (!isPasswordMatch(password, confirmPassword)) {
            dispatch(setMessage('Passwords do not match.', 'error'));
            valid = false;
        } else {
            dispatch(setMessage(''));
        }

        if (valid) {
            dispatch(register({email, firstName, lastName, password}))
                .then(() =>
                    dispatch(setMessage(
                        'Registration was successful, please check your email for the confirmation link.',
                        'success'
                    )))
                .catch((error) => {
                    alert(error)
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
        />
    );
};
