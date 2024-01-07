import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { login } from '../../../redux/actions/admin/adminActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const LogInUi = ({ classes }) => {
    const navigate = useNavigate(); // Rename history to navigate
    const dispatch = useDispatch();

    // Function to handle login and navigation
    const handleLogin = async () => {
        // Dispatch login action
        dispatch(login())
            // .then(() => navigate('/'));

        // Navigate to 'pages' route
        // navigate('/');

        // Navigate to '/' route (if needed)
        // navigate('/'); // Uncomment if you need to navigate to '/' after '/pages'
    };

    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField type='text' name='userName' label="Login" variant="outlined" />
                <TextField type='password' name="password" label="Password" variant="outlined" />
                <Button onClick={handleLogin} className={classes.LogInButton}>Log In</Button>
            </form>
        </div>
    );
};
