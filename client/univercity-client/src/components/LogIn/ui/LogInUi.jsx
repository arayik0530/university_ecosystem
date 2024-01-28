import React from 'react';
import TextField from '@mui/material/TextField';
import Button  from '@mui/material/Button';
import Alert from '@mui/material/Alert';

export const LogInUi = ({classes, emailRef, passwordRef, handleLogin, errorMessage}) => {
    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleLogin}>
                <TextField
                    className={classes.textField}
                    type='text'
                    name='email'
                    label="Email"
                    variant="outlined"
                    inputRef={emailRef}
                />
                <TextField
                    className={classes.textField}
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
