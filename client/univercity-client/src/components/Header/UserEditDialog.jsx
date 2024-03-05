import React, {useEffect, useRef, useState} from 'react';
import {Avatar, Button, Dialog, DialogContent, DialogTitle, IconButton, TextField, Typography} from "@mui/material";
import {Close} from "@mui/icons-material";
import API from "../../API";
import {useDispatch} from "react-redux";
import {setMessage} from "../../redux/actions/message/messageActions";
import {editQuestion} from "../../redux/actions/questions/questionsActions";

const UserEditDialog = ({open, setIsDialogOpen}) => {
    const dispatch = useDispatch();

    const [user, setUser] = useState({});
    const [avatarImage, setAvatarImage] = useState(null);
    const [iconFile, setIconFile] = useState(null);

    const uploadRef = useRef(null);

    useEffect(() => {
        API.get('/user/getMe')
            .then(response => {
                const user = response.data;
                setUser(user);
                return user;
            })
            .then(user => {
                if (user.imageId) {
                    API.get(`user/image/${user.id}`, {
                        responseType: 'arraybuffer'
                    })
                        .then(response => {
                            const data = response.data;
                            if (data && data.byteLength > 0) {
                                const blob = new Blob([data], {type: response.headers['content-type']});
                                setIconFile(new File([blob], 'image', {type: blob.type}))
                                const src = URL.createObjectURL(blob);
                                setAvatarImage(src);
                            }
                        })
                        .catch(e => {
                        });
                }
            })
            .catch(e => {
            });
    }, []);

    const handleSubmit = () => {
        let valid = true;
        let errorMessage = '';
        if (!user.firstName) {
            valid = false;
            errorMessage = errorMessage.concat(`First Name can't be empty \n`);
        }
        if (!user.lastName) {
            valid = false;
            errorMessage = errorMessage.concat(`Last Name can't be empty \n`);
        }
        if (!user.email || !isEmailValid(user.email)) {
            valid = false;
            errorMessage = errorMessage.concat(`Please enter a valid email address. \n`);
        }
        if(user.email){
            API.get(`/user/exists-email?email=${user.email}&userId=${user.id}`)
                .then(res => {
                   if(res.data){//if another user with the same email exists
                       errorMessage = errorMessage.concat(`A User with this email already exists \n`);
                       valid = false;
                   }
                    if (user.password && !isPasswordComplex(user.password)) {
                        valid = false;
                        errorMessage = errorMessage.concat(`Password must be at least 6 characters long and contain at least one letter and one number.`);
                        dispatch(setMessage(errorMessage, 'error'));
                    }
                    if (valid) {
                        const formData = new FormData();
                        formData.append('image', iconFile);

                        API.post('/user/upload-image', formData, {
                            headers: {
                                ...API.defaults.headers,
                                "Content-Type": "multipart/form-data"
                            }
                        })
                            .then(r => {API.put('/user/update', user)
                                .then(data => {
                                    dispatch(setMessage('User Info SuccessFully Updated', 'success'));
                                }).catch(e => {
                                })})
                            .catch(e => {
                            });
                        setIsDialogOpen(false);
                    } else {
                        dispatch(setMessage(errorMessage, 'error'));
                    }
                })
                .catch(e => {
                });
        }
    };

    const handleClose = () => {
        setIsDialogOpen(false);
    };

    const handleAvatarClick = () => {
        uploadRef.current.click();
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setIconFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteClick = () => {
        setAvatarImage("");
        setIconFile(null);
    };

    const isPasswordComplex = (password) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
        return passwordRegex.test(password);
    };

    const isEmailValid = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>
                <Typography variant="h6">Edit User Information</Typography>
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
            <DialogContent dividers>
                <form noValidate autoComplete="off" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    alignItems: 'center',
                    position: 'relative'
                }}>
                    <input ref={uploadRef} type="file" accept="image/*" style={{display: 'none'}}
                           onChange={handleImageChange}/>
                    <div style={{position: 'relative', display: 'inline-block'}}>
                        <Avatar
                            alt="User Picture"
                            src={avatarImage}
                            sx={{width: 300, height: 300, cursor: 'pointer', borderRadius: 0}}
                            onClick={handleAvatarClick}
                        />
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                width: '20%',
                                height: '20%',
                                cursor: 'pointer',
                                backgroundColor: 'transparent'
                            }}
                        />
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
                    <TextField label="First Name" fullWidth value={user.firstName ? user.firstName : ''}
                               onChange={
                                   (e) => setUser({...user, firstName: e.target.value})
                               }/>
                    <TextField label="Last Name" fullWidth value={user.lastName ? user.lastName : ''} onChange={
                        (e) => setUser({...user, lastName: e.target.value})
                    }/>
                    <TextField label="Email" fullWidth value={user.email ? user.email : ''} onChange={
                        (e) => setUser({...user, email: e.target.value})
                    }/>
                    <TextField label="Password" fullWidth type="password" value={user.password ? user.password : ''}
                               onChange={
                                   (e) => setUser({...user, password: e.target.value})
                               }/>
                    <Button variant="contained" color="primary" onClick={handleSubmit}
                            sx={{alignSelf: 'center'}}>Save</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UserEditDialog;
