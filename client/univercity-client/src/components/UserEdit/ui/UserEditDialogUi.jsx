import React from 'react';
import {Avatar, Button, Dialog, DialogContent, DialogTitle, IconButton, TextField, Typography} from "@mui/material";
import {Close} from "@mui/icons-material";
import {makeStyles} from "tss-react/mui";

const useStyles = makeStyles()({
    dialogContent: {
        "&::-webkit-scrollbar": {
            width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "silver",
            borderRadius: "5px",
        },
        "&::-webkit-scrollbar-track": {
            backgroundColor: '#EFE5D5',
        }
    },
    inputsContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '20%',
        height: '20%',
        cursor: 'pointer',
        backgroundColor: 'transparent'
    },
    avatarContainer: {
        position: 'relative',
        display: 'inline-block'
    },
    userEditForm: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'center',
        position: 'relative'
    }
});

const UserEditDialogUi = ({
                              open,
                              handleClose,
                              uploadRef,
                              handleImageChange,
                              avatarImage,
                              handleSubmit,
                              user,
                              setUser,
                              handleAvatarClick,
                              handleDeleteClick
                          }) => {
    const {classes} = useStyles();
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>
                <Typography
                    variant="inherit"
                >
                    Edit User Information
                </Typography>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                >
                    <Close/>
                </IconButton>
            </DialogTitle>
            <DialogContent dividers className={classes.dialogContent}>
                <form
                    className={classes.userEditForm}
                    noValidate
                    autoComplete="off"
                >
                    <input ref={uploadRef}
                           type="file"
                           accept="image/*"
                           style={{display: 'none'}}
                           onChange={handleImageChange}
                    />
                    <div className={classes.avatarContainer}>
                        <Avatar
                            alt="User Picture"
                            src={avatarImage}
                            sx={{
                                width: 300,
                                height: 300,
                                cursor: 'pointer',
                                borderRadius: 0
                            }}
                            onClick={handleAvatarClick}
                        />
                        <div className={classes.inputsContainer}/>
                        <IconButton
                            title={'Delete Image'}
                            aria-label="close"
                            onClick={handleDeleteClick}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                '& svg': {
                                    fontSize: 14
                                }
                            }}
                        >
                            <Close/>
                        </IconButton>
                    </div>
                    <TextField
                        label="First Name"
                        fullWidth
                        value={user.firstName ? user.firstName : ''}
                        onChange={
                            (e) => setUser({...user, firstName: e.target.value})
                        }
                    />
                    <TextField
                        label="Last Name"
                        fullWidth
                        value={user.lastName ? user.lastName : ''}
                        onChange={
                            (e) => setUser({...user, lastName: e.target.value})
                        }
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        value={user.email ? user.email : ''}
                        onChange={
                            (e) => setUser({...user, email: e.target.value})
                        }
                    />
                    <TextField
                        label="Password"
                        fullWidth
                        type="password"
                        value={user.password ? user.password : ''}
                        onChange={
                            (e) => setUser({...user, password: e.target.value})
                        }
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        sx={{alignSelf: 'center'}}
                    >Save
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UserEditDialogUi;
