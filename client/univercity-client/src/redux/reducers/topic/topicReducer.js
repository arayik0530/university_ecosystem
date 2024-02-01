import {
    DELETE_TOPIC,
    EDIT_TOPIC,
    GET_TOPICS,
    SET_PAGE_ELEMENT_COUNT,
    SET_SELECTED_PAGE_INDEX, SET_TITLE_FOR_FILTER
} from "../../actions/actionTypes/topicActionTypes";

const initialState = {
    topics: [],
    selectedPageIndex: {
        index: 0
    },
    totalCount: null,
    elementsPerPage: {
        count: 10
    },
    titleForFilter: {
        text: ""
    }
};

const topicReducer = (state = initialState, action) => {
    switch (action.type) {
        case EDIT_TOPIC:
            return {
                ...state,
                topics: state.topics.map(topic =>
                    topic.id === action.payload.topic.id ? {...topic, title: action.payload.topic.title} : topic
                )
            };
        case DELETE_TOPIC:
            return {
                ...state,
                topics: state.topics.filter(topic => topic.id !== action.payload.topic.id)
            };
        case GET_TOPICS:
            return {
                ...state,
                topics: [...action.payload.topics.sort((a, b) => b.id - a.id)],
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
        case SET_TITLE_FOR_FILTER:
            return {
                ...state,
                titleForFilter: action.payload.titleForFilter
            };
        default:
            return state;
    }
};

export default topicReducer;