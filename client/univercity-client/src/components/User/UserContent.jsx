import React, {useEffect, useState} from 'react';
import {makeStyles} from "tss-react/mui";
import {Typography} from "@mui/material";
import API from "../../API";

const useStyles = makeStyles()({
    container: {
        height: "70vh",
        width: '100%',
        overflowY: "scroll",
        backgroundColor: '#EFE5D5',
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
    box_container: {
        display: 'flex',
        flexWrap: 'wrap',
        paddingTop: '30px'
    },
    box: {
        width: '200px',
        margin: '10px',
        padding: '5px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        textAlign: 'center',
        backgroundColor: '#3F51B5',
        cursor: 'pointer',
        '&:hover': {
            opacity: 0.5
        }
    },
    box_title: {
        fontWeight: 'bold',
        color: 'white'
    },
    box_text: {
        marginTop: '5px',
        color: 'white'
    },
    passed_text: {
        color: 'grey'
    }
});

const UserContent = () => {
    const {classes} = useStyles();
    const[activeQuizzes, setActiveQuizzes] = useState([]);
    const[passedQuizzes, setPassedQuizzes] = useState([]);

    useEffect(() => {
        API.get('/quiz/upcoming/own')
            .then(response => {
                const activeQuizzes = response.data;
                setActiveQuizzes(activeQuizzes);
            })
            .catch(e => {
            });
        API.get('/quiz/own')
            .then(response => {
                const passedQuizzes = response.data;
                setPassedQuizzes(passedQuizzes);
                console.log(passedQuizzes);
            })
            .catch(e => {
            });
    }, []);


    const handleQuizClick = (quizId, isActiveQuiz) => {
        // Navigate to another page
    };

    return (
        <div style={{margin: '20px'}} className={classes.container}>
            <Typography variant="h5">Active Quizzes</Typography>
            <div className={classes.box_container}>
                {activeQuizzes.map(quiz => (
                    <div className={classes.box} key={quiz.id} onClick={() => handleQuizClick(quiz.id, true)}>
                        <div>
                            <p className={classes.box_title}>{quiz.topic}</p>
                            <p className={classes.box_title}>Deadline: {quiz.deadline}</p>
                            <div className={classes.box_text}>Pass the Quiz</div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{marginTop: '50px'}}>
                <Typography variant="h5">Passed Quizzes</Typography>
                <div className={classes.box_container}>
                    {passedQuizzes.map(quiz => (
                        <div className={classes.box} key={quiz.id} onClick={() => handleQuizClick(quiz.id, false)}>
                            <div style={{color: "grey"}}>
                                <p className={`${classes.box_title} ${classes.passed_text}`}>{quiz.topic}</p>
                                <p className={`${classes.box_title} ${classes.passed_text}`}>{quiz.endTime.split('T')[0]}</p>
                                <div className={`${classes.box_text} ${classes.passed_text}`}>{parseFloat(quiz.successPercent).toFixed(2)}%</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserContent;
