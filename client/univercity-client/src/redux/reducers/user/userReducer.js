import {SET_USER_TYPE, USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS} from "../../actions/actionTypes/userActionTypes";

const initialState = {
    isLoggedIn: !!localStorage.getItem('token'),
    token: localStorage.getItem('token') || null,
    userType: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                isLoggedIn: true,
                token: action.payload.token,
            };
        case USER_LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return {
                ...state,
                isLoggedIn: false,
                token: null,
            };
        case SET_USER_TYPE:
            return {
                ...state,
                userType: action.payload
            };
        default:
            return state;
    }
};

export default userReducer;