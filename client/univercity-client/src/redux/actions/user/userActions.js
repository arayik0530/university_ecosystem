import {adminConstants} from '../../constants/admin/adminConstants';
import {API} from '../../../API/index';
import {SET_USER_TYPE, USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS} from "../actionTypes/userActionTypes";
import {ADMIN, USER} from "../../constants/globalConstants";
import {setMessage} from '../message/messageActions';
import {useNavigate} from "react-router-dom";

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
        });
}

const setToken = (token) => ({type: adminConstants.SET_TOKEN, payload: token});
export const setAdmin = (admin) => ({type: adminConstants.SET_ADMIN, payload: admin});


export const login = (credentials) => (dispatch) => {
    API.post('auth/login', credentials)
        .then(({data}) => {
            dispatch(userLoginSuccess(data))
        })
        .then(res => {
            dispatch(getCurrentUser());
        })
        .catch((e) => {});
}

export const register = (credentials) => (dispatch) => {
    API.post('auth/register', credentials)
        .then(() =>
        dispatch(setMessage(
            'Registration was successful, please check your email for the confirmation link.',
            'success'
        )))
        .catch(e => {
    });
}

export const addMenuItem = () => {
    const item = {title: 'menuItem'};
    const token = localStorage.getItem('token')
    API.post('categories/add', item, {
        headers: {
            AUTHORIZATION: `Bearer_ ${token}`,
        },
    }).catch(e => {
    });
}
