import React, {useEffect, useState} from 'react';
import {makeStyles} from "tss-react/mui";
import {Button, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import API from "../../../API";
import Question from "../Question/functional/Question";
import {setQuiz} from "../../../redux/actions/quiz/quizActions";
import {QUIZ_TYPE_ACTIVE, QUIZ_TYPE_PASSED} from "../../../redux/constants/globalConstants";
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles()({
    button: {
        // margin: theme.spacing(1),
        borderRadius: 5,
        padding: '5px 15px',
        // fontWeight: 'bold',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
            backgroundColor: '#3f51b5',
            color: '#fff',
            boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
        }
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    }
});

const QuizPage = () => {
    const {classes} = useStyles();
    const quizInfo = useSelector((state) => state.quiz);
    const [quizQuestion, setQuizQuestion] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        API.get(`/quiz/start/${quizInfo.quizId}`)
            .then(response => {
                const firstQuestion = response.data;
                setQuizQuestion(firstQuestion);
                // console.log(quizQuestion)
            })
            .catch(e => {
            });
        dispatch(setQuiz({}));
    }, []);

    function getPreviousQuestion () {
        API.get(`/quiz/previous-question?previousQuestionId=${quizQuestion.previousQuizQuestionId}`)
            .then(response => {
                const previousQuestion = response.data;
                setQuizQuestion(previousQuestion);
                // console.log(quizQuestion)
            })
            .catch(e => {
            });
    }

    function handleSubmit () {
        API.post(`/quiz/finish?quizId=${quizQuestion.quizId}`)
            .then(response => {
                navigate('/');
            })
            .catch(e => {
            });
    }

    function getNextQuestion () {
        API.get(`/quiz/next-question?nextQuestionId=${quizQuestion.nextQuizQuestionId}`)
            .then(response => {
                const nextQuestion = response.data;
                setQuizQuestion(nextQuestion);
                // console.log(quizQuestion)
            })
            .catch(e => {
            });
    }

    return (
        <div className={classes.container}>
            {quizQuestion.quizQuestionId && <Question question={quizQuestion}/>}
            <div className={classes.buttonContainer}>
                <Button
                    style={{marginLeft: '20px', visibility: quizQuestion.previousQuizQuestionId ? 'visible' : 'hidden'}}
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={getPreviousQuestion}
                >
                    &lt; Previous
                </Button>
                <Button
                    style={{visibility: !quizQuestion.nextQuizQuestionId ? 'visible' : 'hidden'}}
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
                <Button
                    style={{marginRight: '20px', visibility: quizQuestion.nextQuizQuestionId ? 'visible' : 'hidden'}}
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={getNextQuestion}
                >
                    Next &gt;
                </Button>
            </div>
        </div>
    );
};

export default QuizPage;
