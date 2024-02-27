import {SET_MESSAGE} from "../actionTypes/messageActionTypes";

export const setMessage = (messageText, messageType = 'info') => ({
    type: SET_MESSAGE,
    payload: {messageText: messageText, messageType: messageType}
});