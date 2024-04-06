import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const RegisterUi = ({
                               classes,
                               firstNameRef,
                               lastNameRef,
                               emailRef,
                               passwordRef,
                               confirmPasswordRef,
                               handleRegister,
                           }) => {
    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleRegister}>
                <TextField
                    type='text'
                    name='firstName'
                    label="First Name"
                    variant="outlined"
                    inputRef={firstNameRef}
                />
                <TextField
                    type='text'
                    name='lastName'
                    label="Last Name"
                    variant="outlined"
                    inputRef={lastNameRef}
                />
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
                <TextField
                    type='password'
                    name="confirmPassword"
                    label="Confirm Password"
                    variant="outlined"
                    inputRef={confirmPasswordRef}
                />
                <Button type="submit" className={classes.LogInButton}>Register</Button>
            </form>
        </div>
    );
};
