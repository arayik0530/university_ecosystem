import {
    SET_MESSAGE
} from "../../actions/actionTypes/messageActionTypes";

const initialState = {
    messageText: null,
    messageType: 'info'
};

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MESSAGE:
            return {
                ...state,
                messageText: action.payload.messageText,
                messageType: action.payload.messageType
            };
        default:
            return state;
    }
};

export default messageReducer;