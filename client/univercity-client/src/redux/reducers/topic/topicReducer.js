import {ADD_TOPIC, DELETE_TOPIC, EDIT_TOPIC, GET_TOPICS} from "../../actions/actionTypes/topicActionTypes";

const initialState = {
    topics: []
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
            // console.log('action payload is: ', action.payload.topics[0])
            return {
                ...state,
                topics: [...action.payload.topics.sort((a, b) => b.id - a.id)]
            };
        default:
            return state;
    }
};

export default topicReducer;