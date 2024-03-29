import React from 'react';
import {Checkbox, FormControl, FormControlLabel, FormGroup, Radio, RadioGroup, Typography} from '@mui/material';
import {makeStyles} from "tss-react/mui";
import API from "../../../../API";

const useStyles = makeStyles()({

    container: {
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: "65vh",
        width: '100%',
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
            width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "silver", borderRadius: "5px",
        },
        "&::-webkit-scrollbar-track": {
            backgroundColor: '#EFE5D5',
        }
    }, answerContainer: {
        display: 'flex', flexDirection: 'row', justifyContent: 'space-around',
    }, missed: {
        '& .MuiTypography-root, & .MuiCheckbox-root, & .MuiRadio-root': {
            color: 'darkorange'
        }
    }, answeredWrong: {
        '& .MuiTypography-root, & .MuiCheckbox-root, & .MuiRadio-root': {
            color: 'red'
        }
    }, answeredRight: {
        '& .MuiTypography-root, & .MuiCheckbox-root, & .MuiRadio-root': {
            color: 'green'
        }
    }
});

const Question = ({question, activeQuiz}) => {
    const {classes} = useStyles();

    const handleAnswerSelection = (answerId, checked) => {
        let newAnswers;
        const oldAnswers = question.answers.filter(a => a.selected).map(a => a.id);
        if (question.isMultiAnswer) {
            if (checked) {
                newAnswers = [...oldAnswers, answerId];
            } else {
                newAnswers = oldAnswers.filter(item => item !== answerId);
            }
        } else {
            newAnswers = [answerId];
        }
        question.answers.forEach(a => {
            if (newAnswers.includes(a.id)) {
                a.selected = true;
            } else {
                a.selected = false;
            }
        });
        answerToQuestion(newAnswers);
    };

    function answerToQuestion(newAnswers) {
        API.post(`/quiz/${question.quizQuestionId}/question-answers`, newAnswers)
            .catch(e => {
            });
    }

    return (<div className={classes.container}>
        <FormControl component="fieldset">
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <Typography
                    style={{marginLeft: '20px', marginRight: '20px', marginBottom: '20px', fontSize: '18px'}}
                    variant="body1">{question.text}</Typography>
            </div>
            <div className={classes.answerContainer}>
                <div style={{width: '50vw', display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                    {question.isMultiAnswer ? (<FormGroup>
                        {question.answers.map((answer) => (<FormControlLabel
                            className={!activeQuiz && (answer.selected ? (answer.rightAnswer ? classes.answeredRight : classes.answeredWrong) : (answer.rightAnswer ? classes.missed : ''))}
                            key={answer.id}
                            style={{marginTop: '10px'}}
                            control={<Checkbox
                                size="small"
                                checked={question.answers.filter(a => a.selected).map(a => a.id).includes(answer.id)}
                                onChange={(e) => handleAnswerSelection(answer.id, e.target.checked)}
                                name={`answer-${answer.id}`}
                                disabled={!activeQuiz}
                            />}
                            label={<Typography variant="body1" style={{fontSize: '16px'}}>
                                {answer.text}
                            </Typography>}
                        />))}
                    </FormGroup>) : (<RadioGroup>
                        {question.answers.map((answer) => (

                            <FormControlLabel
                                className={!activeQuiz && (answer.selected ? (answer.rightAnswer ? classes.answeredRight : classes.answeredWrong) : (answer.rightAnswer ? classes.missed : ''))}
                                key={answer.id}
                                style={{marginTop: '10px'}}
                                control={<Radio
                                    size="small"
                                    checked={question.answers.filter(a => a.selected).map(a => a.id).includes(answer.id)}
                                    onChange={(e) => handleAnswerSelection(answer.id, e.target.checked)}
                                    name={`answer-${answer.id}`}
                                    disabled={!activeQuiz}
                                />}
                                label={<Typography variant="body1" style={{fontSize: '16px'}}>
                                    {answer.text}
                                </Typography>}
                            />))}
                    </RadioGroup>)}
                </div>
            </div>
        </FormControl>
    </div>);
};

export default Question;
