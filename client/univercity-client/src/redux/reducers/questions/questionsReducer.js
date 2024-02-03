import {
    DELETE_QUESTION,
    EDIT_QUESTION,
    GET_QUESTIONS,
    SET_PAGE_ELEMENT_COUNT,
    SET_SELECTED_PAGE_INDEX,
    SET_TEXT_FOR_FILTER, SET_TOPIC_FOR_FILTER
} from "../../actions/actionTypes/questionsActionTypes";

const initialState = {
    questions: [],
    selectedPageIndex: {
        index: 0
    },
    totalCount: null,
    elementsPerPage: {
        count: 10
    },
    textForFilter: {
        text: ""
    },
    topicForFilter: {
        id: ""
    }
};

const questionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case EDIT_QUESTION:
            return {
                ...state,
                questions: state.questions.map(question =>
                    question.id === action.payload.question.id ? {
                        ...question,
                        text: action.payload.question.text
                    } : question
                )
            };
        case DELETE_QUESTION:
            return {
                ...state,
                questions: state.questions.filter(question => question.id !== action.payload.question.id)
            };
        case GET_QUESTIONS:
            return {
                ...state,
                questions: [...action.payload.questions.sort((a, b) => b.id - a.id)],
                totalCount: Number(action.payload.totalCount)
            };
        case SET_SELECTED_PAGE_INDEX:
            return {
                ...state,
                selectedPageIndex: action.payload.pagIndex
            };
        case SET_PAGE_ELEMENT_COUNT:
            return {
                ...state,
                elementsPerPage: action.payload.elementsPerPage
            };
        case SET_TEXT_FOR_FILTER:
            return {
                ...state,
                textForFilter: action.payload.textForFilter
            };
        case SET_TOPIC_FOR_FILTER:
            return {
                ...state,
                topicForFilter: action.payload.topicForFilter
            };
        default:
            return state;
    }
};

export default questionsReducer;