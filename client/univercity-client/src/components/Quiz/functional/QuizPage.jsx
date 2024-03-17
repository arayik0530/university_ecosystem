import React, {useEffect, useState} from 'react';
import {makeStyles} from "tss-react/mui";
import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import API from "../../../API";
import Question from "../Question/functional/Question";
import {setQuiz} from "../../../redux/actions/quiz/quizActions";
import {useNavigate} from "react-router-dom";
import {QUIZ_TYPE_ACTIVE} from "../../../redux/constants/globalConstants";
import CountDownTimer from "./CountDownTimer/CountDownTimer";

const useStyles = makeStyles()({
    button: {
        borderRadius: 5,
        padding: '5px 15px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
            backgroundColor: '#3f51b5', color: '#fff', boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
        }
    }, container: {
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
    }, buttonContainer: {
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'
    }
});

const QuizPage = () => {
    const {classes} = useStyles();
    const quizInfo = useSelector((state) => state.quiz);
    const [quizQuestion, setQuizQuestion] = useState({});
    const [activeQuiz, setActiveQuiz] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (quizInfo && quizInfo.quizId) {
            if (quizInfo.quizType === QUIZ_TYPE_ACTIVE) {
                setActiveQuiz(true);
                API.get(`/quiz/start/${quizInfo.quizId}`)
                    .then(response => {
                        const firstQuestion = response.data;
                        setQuizQuestion(firstQuestion);
                        localStorage.setItem('quiz_question_id', firstQuestion.quizQuestionId);
                    })
                    .catch(e => {
                        navigate('/');
                    });
            } else {
                API.get(`/quiz/get/${quizInfo.quizId}`)
                    .then(response => {
                        const question = response.data;
                        setActiveQuiz(!question.quizFinished);
                        setQuizQuestion(question);
                        localStorage.setItem('quiz_question_id', question.quizQuestionId);
                    })
                    .catch(e => {
                    });
            }
            dispatch(setQuiz({}));
        } else if (localStorage.getItem('quiz_question_id')) {
            API.get(`/quiz/get/question/${localStorage.getItem('quiz_question_id')}`)
                .then(response => {
                    const question = response.data;
                    setActiveQuiz(!question.quizFinished);
                    setQuizQuestion(question);
                })
                .catch(e => {
                });
        }
    }, []);

    function getPreviousQuestion() {
        API.get(`/quiz/previous-question?previousQuestionId=${quizQuestion.previousQuizQuestionId}`)
            .then(response => {
                const previousQuestion = response.data;
                setActiveQuiz(!previousQuestion.quizFinished);
                setQuizQuestion(previousQuestion);
                localStorage.setItem('quiz_question_id', previousQuestion.quizQuestionId);
            })
            .catch(e => {
            });
    }

    function handleSubmit() {
        if (activeQuiz) {
            API.post(`/quiz/finish?quizId=${quizQuestion.quizId}`)
                .then(response => {
                    localStorage.removeItem('quiz_question_id');
                    navigate('/');
                })
                .catch(e => {
                });
        } else {
            navigate('/');
        }
    }

    function getNextQuestion() {
        API.get(`/quiz/next-question?nextQuestionId=${quizQuestion.nextQuizQuestionId}`)
            .then(response => {
                const nextQuestion = response.data;
                setActiveQuiz(!nextQuestion.quizFinished);
                setQuizQuestion(nextQuestion);
                localStorage.setItem('quiz_question_id', nextQuestion.quizQuestionId);
            })
            .catch(e => {
            });
    }

    return (<div className={classes.container}>
            {activeQuiz && <CountDownTimer futureDate={new Date(quizQuestion.expectedFinishTime)}/>}
            {!console.log(quizQuestion) && quizQuestion.quizQuestionId &&
                <Question question={quizQuestion} activeQuiz={activeQuiz}/>}
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
                    {activeQuiz ? 'Submit' : 'Close'}
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
        </div>);
};

export default QuizPage;
