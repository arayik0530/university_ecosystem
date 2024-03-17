import React, {useEffect, useState} from 'react';
import {makeStyles} from "tss-react/mui";
import {Typography} from "@mui/material";
import {format} from 'date-fns';
import API from "../../API";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setQuiz} from "../../redux/actions/quiz/quizActions";
import {QUIZ_TYPE_ACTIVE, QUIZ_TYPE_PASSED} from "../../redux/constants/globalConstants";

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
    const navigate = useNavigate();
    const {classes} = useStyles();
    const dispatch = useDispatch();
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
            })
            .catch(e => {
            });
    }, []);


    const handleQuizClick = (quizId, isActiveQuiz) => {
        dispatch(setQuiz({quizId: quizId, quizType : isActiveQuiz ? QUIZ_TYPE_ACTIVE : QUIZ_TYPE_PASSED}))
        navigate('/quiz');
    };

    return (
        <div style={{margin: '20px'}} className={classes.container}>
            <Typography variant="h5">Active Quizzes</Typography>
            <div className={classes.box_container}>
                {activeQuizzes.map(quiz => (
                    <div className={classes.box} key={quiz.id} onClick={() => handleQuizClick(quiz.id, true)}>
                        <div>
                            <p className={classes.box_title}>{quiz.topic}</p>
                            <p className={classes.box_title}>Deadline: {format(new Date(quiz.deadline), 'dd-MM-yyyy')}</p>
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
                                <p className={`${classes.box_title} ${classes.passed_text}`}>{quiz.endTime && format(new Date(quiz.endTime), 'dd-MM-yyyy')}</p>
                                <div className={`${classes.box_text} ${classes.passed_text}`}>{quiz.successPercent ? parseFloat(quiz.successPercent).toFixed(2) : 0}%</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserContent;
