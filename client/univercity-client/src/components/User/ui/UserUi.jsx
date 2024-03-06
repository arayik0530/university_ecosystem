import React from 'react';
import {makeStyles} from "tss-react/mui";
import {Typography} from "@mui/material";

const useStyles = makeStyles()({
    container: {
        height: "80vh",
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
        padding: '15px',
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
    }
});

const UserUi = () => {
    const {classes} = useStyles();
    const activeQuizzes = [
        {id: 1, title: 'Quiz 1', subject: 'Mathematics'},
        {id: 2, title: 'Quiz 2', subject: 'Science'},
        {id: 3, title: 'Quiz 3', subject: 'History'},
        {id: 4, title: 'Quiz 4', subject: 'English'},
        {id: 5, title: 'Quiz 5', subject: 'Geography'},
        {id: 6, title: 'Quiz 6', subject: 'Physics'},
        {id: 7, title: 'Quiz 7', subject: 'Chemistry'},
        {id: 7, title: 'Quiz 7', subject: 'Chemistry'},
        {id: 7, title: 'Quiz 7', subject: 'Chemistry'},
        {id: 7, title: 'Quiz 7', subject: 'Chemistry'},
        {id: 7, title: 'Quiz 7', subject: 'Chemistry'},
        {id: 7, title: 'Quiz 7', subject: 'Chemistry'},
        {id: 7, title: 'Quiz 7', subject: 'Chemistry'},
        {id: 7, title: 'Quiz 7', subject: 'Chemistry'},
        {id: 7, title: 'Quiz 7', subject: 'Chemistry'},
        {id: 7, title: 'Quiz 7', subject: 'Chemistry'},
        {id: 7, title: 'Quiz 7', subject: 'Chemistry'},
        {id: 7, title: 'Quiz 7', subject: 'Chemistry'},
        {id: 7, title: 'Quiz 7', subject: 'Chemistry'},
        {id: 7, title: 'Quiz 7', subject: 'Chemistry'},
        {id: 7, title: 'Quiz 7', subject: 'Chemistry'},
        {id: 7, title: 'Quiz 7', subject: 'Chemistry'},
        {id: 7, title: 'Quiz 7', subject: 'Chemistry'},
        {id: 7, title: 'Quiz 7', subject: 'Chemistry'},
        {id: 7, title: 'Quiz 7', subject: 'Chemistry'},
        {id: 7, title: 'Quiz 7', subject: 'Chemistry'},
        {id: 7, title: 'Quiz 7', subject: 'Chemistry'},
        {id: 7, title: 'Quiz 7', subject: 'Chemistry'},
        {id: 7, title: 'Quiz 7', subject: 'Chemistry'},
        {id: 7, title: 'Quiz 7', subject: 'Chemistry'},
        {id: 7, title: 'Quiz 7', subject: 'Chemistry'},
        {id: 7, title: 'Quiz 7', subject: 'Chemistry'},
        {id: 7, title: 'Quiz 7', subject: 'Chemistry'},
        {id: 7, title: 'Quiz 7', subject: 'Chemistry'},
    ];

    const passedQuizzes = [
        {id: 8, title: 'Quiz 8', subject: 'Biology', passingPercentage: 80},
        {id: 9, title: 'Quiz 9', subject: 'Computer Science', passingPercentage: 70},
        {id: 9, title: 'Quiz 9', subject: 'Computer Science', passingPercentage: 70},
        {id: 9, title: 'Quiz 9', subject: 'Computer Science', passingPercentage: 70},
        {id: 9, title: 'Quiz 9', subject: 'Computer Science', passingPercentage: 70},
        {id: 9, title: 'Quiz 9', subject: 'Computer Science', passingPercentage: 70},
        {id: 9, title: 'Quiz 9', subject: 'Computer Science', passingPercentage: 70},
        {id: 9, title: 'Quiz 9', subject: 'Computer Science', passingPercentage: 70},
        {id: 9, title: 'Quiz 9', subject: 'Computer Science', passingPercentage: 70},
        {id: 9, title: 'Quiz 9', subject: 'Computer Science', passingPercentage: 70},
        {id: 9, title: 'Quiz 9', subject: 'Computer Science', passingPercentage: 70},
        {id: 9, title: 'Quiz 9', subject: 'Computer Science', passingPercentage: 70},
        {id: 9, title: 'Quiz 9', subject: 'Computer Science', passingPercentage: 70},
        {id: 9, title: 'Quiz 9', subject: 'Computer Science', passingPercentage: 70},
        {id: 9, title: 'Quiz 9', subject: 'Computer Science', passingPercentage: 70},
        {id: 9, title: 'Quiz 9', subject: 'Computer Science', passingPercentage: 70},
        {id: 9, title: 'Quiz 9', subject: 'Computer Science', passingPercentage: 70},
        {id: 9, title: 'Quiz 9', subject: 'Computer Science', passingPercentage: 70},
        {id: 9, title: 'Quiz 9', subject: 'Computer Science', passingPercentage: 70},
        {id: 9, title: 'Quiz 9', subject: 'Computer Science', passingPercentage: 70},
        {id: 9, title: 'Quiz 9', subject: 'Computer Science', passingPercentage: 70},
        {id: 9, title: 'Quiz 9', subject: 'Computer Science', passingPercentage: 70},
        {id: 9, title: 'Quiz 9', subject: 'Computer Science', passingPercentage: 70},
        {id: 9, title: 'Quiz 9', subject: 'Computer Science', passingPercentage: 70},
        {id: 9, title: 'Quiz 9', subject: 'Computer Science', passingPercentage: 70},
        {id: 9, title: 'Quiz 9', subject: 'Computer Science', passingPercentage: 70},
        {id: 9, title: 'Quiz 9', subject: 'Computer Science', passingPercentage: 70},
        {id: 9, title: 'Quiz 9', subject: 'Computer Science', passingPercentage: 70},
        {id: 9, title: 'Quiz 9', subject: 'Computer Science', passingPercentage: 70},
        {id: 9, title: 'Quiz 9', subject: 'Computer Science', passingPercentage: 70},
        {id: 9, title: 'Quiz 9', subject: 'Computer Science', passingPercentage: 70},
        {id: 9, title: 'Quiz 9', subject: 'Computer Science', passingPercentage: 70},
    ];


    const handleQuizClick = (quizId) => {
        // Navigate to another page
    };

    return (
        <div style={{margin: '20px'}} className={classes.container}>
            <Typography variant="h5">Active Quizzes</Typography>
            <div className={classes.box_container}>
                {activeQuizzes.map(quiz => (
                    <div className={classes.box} key={quiz.id} onClick={() => handleQuizClick(quiz.id)}>
                        <div>
                            <span className={classes.box_title}>{quiz.title}</span>
                            <div className={classes.box_text}>Pass the Quiz</div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{marginTop: '50px'}}>
                <Typography variant="h5">Passed Quizzes</Typography>
                <div className={classes.box_container}>
                    {passedQuizzes.map(quiz => (
                        <div className={classes.box} key={quiz.id} onClick={() => handleQuizClick(quiz.id)}>
                            <div>
                                <span className={classes.box_title}>{quiz.title}</span>
                                <div className={classes.box_text}>{quiz.passingPercentage}%</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserUi;
