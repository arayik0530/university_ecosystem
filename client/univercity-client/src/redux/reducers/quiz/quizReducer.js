import {SET_QUIZ} from "../../actions/actionTypes/quizActionTypes";

const initialState = {
    quizId: null,
    quizType: null
};

const quizReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_QUIZ:
            return {
                ...state,
                quizId: action.payload.quiz.quizId,
                quizType: action.payload.quiz.quizType,
            };
        default:
            return state;
    }
};

export default quizReducer;