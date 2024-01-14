import React from 'react';
import { Button, makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
        width: '150px'
    },
}));

const AdminLeftSideButtonsContainer = () => {
    const classes = useStyles();

    return (
        <div className={classes.root} >
            <Button className={classes.button} variant="contained" color="primary">
                Topics
            </Button>
            <Button className={classes.button} variant="contained" color="primary">
                Questions
            </Button>
            <Button className={classes.button} variant="contained" color="primary">
                Quiz
            </Button>
        </div>
    );
};

export default AdminLeftSideButtonsContainer;
