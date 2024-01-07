import React, { useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { login } from '../../../redux/actions/admin/adminActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const LogInUi = ({ classes }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Create refs for email and password fields
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    // Function to handle form submission
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Get values from refs
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        // Dispatch login action with email and password
        dispatch(login({ email, password }));

    };

    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleLogin}>
                <TextField
                    type='text'
                    name='email'
                    label="Email"
                    variant="outlined"
                    inputRef={emailRef}
                />
                <TextField
                    type='password'
                    name="password"
                    label="Password"
                    variant="outlined"
                    inputRef={passwordRef}
                />
                <Button type="submit" className={classes.LogInButton}>Log In</Button>
            </form>
        </div>
    );
};
