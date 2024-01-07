import React, {useRef, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {login} from '../../../redux/actions/user/userActions';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';

export const LogInUi = ({classes, emailRef, passwordRef, handleLogin, errorMessage}) => {
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
            {errorMessage && (
                <div style={{marginTop: '10px', display: 'flex', justifyContent: 'center'}}>
                    <Alert severity="error">
                        {errorMessage}
                    </Alert>
                </div>
            )}
        </div>
    )
}
