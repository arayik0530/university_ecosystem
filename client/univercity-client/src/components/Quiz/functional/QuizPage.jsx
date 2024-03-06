import React, {useEffect, useState} from 'react';
import {makeStyles} from "tss-react/mui";
import {Typography} from "@mui/material";
import {useSelector} from "react-redux";

const useStyles = makeStyles()({

});

const QuizPage = () => {
    const {classes} = useStyles();
    const quizInfo = useSelector((state) => state.quiz);

    return (
        <div>
            Hello {quizInfo.quizId} {quizInfo.quizType}
        </div>
    );
};

export default QuizPage;
