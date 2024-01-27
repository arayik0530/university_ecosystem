import React from 'react';
import {makeStyles} from "tss-react/mui";
import Button  from '@mui/material/Button';

const useStyles = makeStyles()({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '16px',
        flexBasis: '14vw'
    },
    button: {
        margin: '8px',
        width: '150px'
    },
});

const AdminLeftSideButtonsContainer = () => {
    const { classes } = useStyles();

    console.log('theme is: ', classes);
    console.log('root is: ', classes.root);
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
