import React from 'react';
import { makeStyles } from "tss-react/mui";
import Button from '@mui/material/Button';
import {adminConstants} from "../../redux/constants/admin/adminConstants";

const useStyles = makeStyles()({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '16px',
        // flexBasis: '14vw'
        width: '15%'
    },
    button: {
        margin: '8px',
        width: '90%',
    },
    selectedButton: {
        margin: '8px',
        width: '90%',
        backgroundColor: 'lightblue',
    },
});

const AdminLeftSideButtonsContainer = ({ selectedPart, selectPart }) => {
    const { classes } = useStyles();

    return (
        <div className={classes.root} >
            <Button className={selectedPart === adminConstants.TOPICS ? classes.selectedButton : classes.button} variant="contained" color="primary"
                    onClick={() => {selectPart(adminConstants.TOPICS)}}
            >
                Topics
            </Button>
            <Button className={selectedPart === adminConstants.QUESTIONS ? classes.selectedButton : classes.button} variant="contained" color="primary"
                    onClick={() => {selectPart(adminConstants.QUESTIONS)}}
            >
                Questions
            </Button>
            <Button className={selectedPart === adminConstants.QUIZ ? classes.selectedButton : classes.button} variant="contained" color="primary"
                    onClick={() => {selectPart(adminConstants.QUIZ)}}
            >
                Quiz
            </Button>
        </div>
    );
};

export default AdminLeftSideButtonsContainer;
