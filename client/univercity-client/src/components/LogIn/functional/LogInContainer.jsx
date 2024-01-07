import React from 'react';
import { LogInUi } from '../ui/LogInUi';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        // position: 'absolute',
        // left: '50%',
        // top: '40%',
        marginTop: '10%',
        transform: 'translate(-50% , -50%)',
        border: '0.5px solid #1540AE',
        boxShadow: '0 0 7px #5984F2',
        borderRadius: 7,
        padding: '15px',
        width: 'max-content',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',

        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    LogInButton: {
        margin: 'auto',
        border: '1px solid #C4C4C4',
        '& > span': {
            color: '#2196F3 !important'
        }
    }
}));





export const LogInContainer = () => {
    const classes = useStyles();
    return <LogInUi classes={classes} />
}
