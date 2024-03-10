import React, {useState} from 'react';
import {FormControl, FormGroup, FormControlLabel, Checkbox, RadioGroup, Radio, Typography} from '@mui/material';
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
        // backgroundColor: '#EFE5D5',
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
    answerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        // alignItems: 'center'
    }
});

const Question = ({question}) => {
    const {classes} = useStyles();

    const [selectedAnswers, setSelectedAnswers] = useState([]);

    const handleAnswerSelection = (answerId) => {
        if (question.isMultiAnswer) {
            setSelectedAnswers((prevSelected) =>
                prevSelected.includes(answerId)
                    ? prevSelected.filter((id) => id !== answerId)
                    : [...prevSelected, answerId]
            );
        } else {
            setSelectedAnswers([answerId]);
        }

        API.post(`/quiz/${question.id}/question-answers`, selectedAnswers)
            .catch(e => {
            });
    };

    return (
        <div className={classes.container}>
            <FormControl component="fieldset">
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <Typography
                        style={{marginLeft: '20px', marginRight: '20px', marginBottom: '20px', fontSize: '18px'}}
                        variant="body1">{question.text}</Typography>
                </div>
                <div className={classes.answerContainer}>
                    <div style={{width: '50vw', display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                        {question.isMultiAnswer ? (
                            <FormGroup>
                                {question.answers.map((answer) => (
                                    <FormControlLabel
                                        key={answer.id}
                                        style={{marginTop: '10px'}}
                                        control={
                                            <Checkbox
                                                size="small"
                                                checked={selectedAnswers.includes(answer.id)}
                                                onChange={() => handleAnswerSelection(answer.id)}
                                                name={`answer-${answer.id}`}
                                            />
                                        }
                                        label={
                                            <Typography variant="body1" style={{fontSize: '16px'}}>
                                                {answer.text}
                                            </Typography>
                                        }
                                    />
                                ))}
                            </FormGroup>
                        ) : (
                            <RadioGroup>
                                {question.answers.map((answer) => (
                                    <FormControlLabel
                                        key={answer.id}
                                        style={{marginTop: '10px'}}
                                        value={String(answer.id)}
                                        control={<Radio size="small"/>}
                                        label={
                                            <Typography variant="body1" style={{fontSize: '16px'}}>
                                                {answer.text}
                                            </Typography>
                                        }
                                        checked={selectedAnswers.includes(answer.id)}
                                        onChange={() => handleAnswerSelection(answer.id)}
                                    />
                                ))}
                            </RadioGroup>
                        )}
                    </div>
                </div>
            </FormControl>
        </div>
    )
        ;
};

export default Question;
