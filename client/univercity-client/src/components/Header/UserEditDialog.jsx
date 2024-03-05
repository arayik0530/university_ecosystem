import {useRef, useState} from 'react';
import {Avatar, Button, Dialog, DialogContent, DialogTitle, IconButton, TextField, Typography} from "@mui/material";
import {Close} from "@mui/icons-material";

const UserEditDialog = ({open, setIsDialogOpen}) => {
    const [avatarImage, setAvatarImage] = useState("assets/images/no-image-icon.png");
    const inputRef = useRef(null);

    const handleClose = () => {
        setIsDialogOpen(false);
    };

    const handleAvatarClick = () => {
        inputRef.current.click();
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteClick = () => {
        setAvatarImage("");
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
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    alignItems: 'center',
                    position: 'relative'
                }}>
                    <input ref={inputRef} type="file" accept="image/*" style={{display: 'none'}}
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
                    <TextField label="First Name" fullWidth />
                    <TextField label="Last Name" fullWidth />
                    <TextField label="Email" fullWidth />
                    <TextField label="Password" fullWidth type="password" />
                    <Button variant="contained" color="primary" onClick={handleClose} sx={{ alignSelf: 'center' }}>Save</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default UserEditDialog;
