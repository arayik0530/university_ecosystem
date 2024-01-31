import {adminConstants} from '../../constants/admin/adminConstants';
import {API} from '../../../API/index';
import {SET_USER_TYPE, USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS} from "../actionTypes/userActionTypes";
import {ADMIN, USER} from "../../constants/globalConstants";

export const userLoginSuccess = (token) => ({
    type: USER_LOGIN_SUCCESS,
    payload: {token},
});

export const userLogoutSuccess = () => ({
    type: USER_LOGOUT_SUCCESS
});

export const setUserType = (userType) => ({
    type: SET_USER_TYPE,
    payload: userType
});
export const getCurrentUser = () => (dispatch) => {
    API.get('/user/getMe')
        .then(data => {
            dispatch(setUserType(data.data.roles[0].includes(ADMIN) ? ADMIN : USER))
        })
        .catch(e => {
        });//TODO handle navigate if to login if not logged in
}

const setToken = (token) => ({type: adminConstants.SET_TOKEN, payload: token});
export const setAdmin = (admin) => ({type: adminConstants.SET_ADMIN, payload: admin});


export const login = (credentials) => (dispatch) => {
    // console.log('credentiels ', credentials)
    return API.post('auth/login', credentials)
        .then(({data}) => {
            localStorage.setItem('token', data);
        })
        .then(res => {
            dispatch(getCurrentUser());
        }).catch(e => {});
}

export const register = (credentials) => (dispatch) => {
    return API.post('auth/register', credentials).catch(e => {});
}

export const addMenuItem = () => {
    const item = {title: 'menuItem'};
    const token = localStorage.getItem('token')
    API.post('categories/add', item, {
        headers: {
            AUTHORIZATION: `Bearer_ ${token}`,
        },
    }).catch(e => {});
}
