import React, {useEffect, useState} from 'react';
import {Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {makeStyles} from "tss-react/mui";
import API from "../../../../API";

const useStyles = makeStyles()({

    questionsContainer: {
        marginTop: "20px",
        width: '1250px'
    },
    questions: {
        marginTop: "20px",
        overflowY: 'auto',
        height: "400px",
        "&::-webkit-scrollbar": {
            width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "silver", borderRadius: "5px",
        },
        "&::-webkit-scrollbar-track": {
            backgroundColor: '#EFE5D5',
        }
    },
    question: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    questionText: {
        fontSize: "0.9rem",
        marginLeft: "0.5rem",
        wordWrap: 'break-word',
        width: '1100px'
    },
    title: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    random: {
        display: 'flex',
        flexDirection: 'row'
    }
});

const QuestionsDialog = ({
                             topic,
                             selectedQuestions,
                             setSelectedQuestions,
                             randomQuestions,
                             setRandomQuestions,
                             questionsDialogOpen,
                             setQuestionsDialogOpen,
                             setQuestionCount,
                             setQuestionCountFieldDisabled
                         }) => {
    const {classes} = useStyles();
    const [allQuestions, setAllQuestions] = useState([])

    useEffect(() => {
        API.get(`/topic/all-questions/lite?topicId=${topic.id}`)
            .then(questions => {
                setAllQuestions(questions.data);
                return questions.data;
            })
            .catch(e => {
            });
    }, []);

    return (
        <Dialog
            open={questionsDialogOpen}
            // onClose={handleCloseDialog}
            maxWidth="l"
            fullWidth
            PaperProps={{
                style: {
                    maxHeight: "calc(100% - 64px * 2)",
                    height: "calc(100% - 64px * 4)",
                    width: "calc(100% - 64px * 8)"
                },
            }}
        >
            <DialogTitle>
                {topic.title}
            </DialogTitle>
            <DialogContent>
                <div className={classes.questionsContainer}>
                    <div className={classes.title}>
                        <Typography variant="h6">Topic questions</Typography>
                        <div className={classes.random}>
                            <Typography variant="h6">Random questions</Typography>
                            <Checkbox
                                style={{
                                    transform: "scale(0.9)",
                                }}
                                checked={randomQuestions}
                                onChange={(e) => {
                                    const checked = e.target.checked;
                                    setRandomQuestions(checked);
                                    setQuestionCountFieldDisabled(!checked);
                                    if (checked) {
                                        setSelectedQuestions([]);
                                    } else {
                                        setQuestionCount('');
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className={classes.questions}>
                        {allQuestions.map((question, index) => (
                            <div key={index} className={classes.question}>
                                <Checkbox
                                    style={{
                                        transform: "scale(0.6)",
                                    }}
                                    disabled={randomQuestions}
                                    checked={selectedQuestions.map(q => q.id).includes(question.id)}
                                    onChange={(e) => {
                                        e.target.checked ? setSelectedQuestions([...selectedQuestions, allQuestions.filter(q => q.id === question.id)[0]]) :
                                            setSelectedQuestions(selectedQuestions.filter(q => q.id !== question.id))
                                    }}
                                />
                                <span className={classes.questionText}>
                                            {question.text}
                                        </span>
                            </div>))}
                    </div>
                </div>
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={() => setQuestionsDialogOpen(false)}
                    color="primary"
                    disabled={!selectedQuestions.length && !randomQuestions}
                >
                    {"Submit"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default QuestionsDialog;
