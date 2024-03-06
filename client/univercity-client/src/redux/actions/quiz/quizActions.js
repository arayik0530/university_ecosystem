import {SET_QUIZ} from "../actionTypes/quizActionTypes";

export const setQuiz = (quiz) => ({
    type: SET_QUIZ,
    payload: {quiz},
});
