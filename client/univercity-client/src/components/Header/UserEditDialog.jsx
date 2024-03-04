import { Avatar, Button, Dialog, DialogContent, DialogTitle, IconButton, TextField, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";

const UserEditDialog = ({ open, setIsDialogOpen }) => {
    const handleClose = () => {
        setIsDialogOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth
                maxWidth="sm">
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
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Avatar alt="User Picture" src="/path/to/user/picture.jpg" sx={{ width: 300, height: 300, alignSelf: 'center' }} />
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
