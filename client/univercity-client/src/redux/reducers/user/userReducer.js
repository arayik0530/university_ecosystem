// import React from 'react';
// import { adminConstants } from '../../constants/user/adminConstants';
//
// export default (state = [], action) => {
//   switch (action.type) {
//     case adminConstants.SET_ADMIN:
//       return {
//         ...state,
//         user: action.payload
//       };
//     case adminConstants.SET_TOKEN:
//       return {
//         ...state,
//         token: action.payload
//       };
//     default:
//       return state
//   }
// }

// userReducer.js


import {SET_USER_TYPE, USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS} from "../../actions/actionTypes/userActionTypes";

const initialState = {
    isLoggedIn: !!localStorage.getItem('token'), // Set initial state based on localStorage
    token: localStorage.getItem('token') || null,
    userType: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token); // Save token to localStorage
            return {
                ...state,
                isLoggedIn: true,
                token: action.payload.token, //TODO check token or payload
            };
        case USER_LOGOUT_SUCCESS:
            localStorage.removeItem('token'); // Remove token from localStorage
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