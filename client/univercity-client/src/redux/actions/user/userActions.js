import {adminConstants} from '../../constants/admin/adminConstants';
import {API} from '../../../API/index';
import {GET_CURRENT_USER, SET_USER_TYPE, USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS} from "../actionTypes/userActionTypes";
// import {get} from "axios";

// Action creator for successful login
export const userLoginSuccess = (token) => ({
    type: USER_LOGIN_SUCCESS,
    payload: {token},
});

// Action creator for successful logout
export const userLogoutSuccess = () => ({
    type: USER_LOGOUT_SUCCESS
});

export const setUserType = (userType) => ({
    type: SET_USER_TYPE,
    payload: userType
});
export const getCurrentUser = () => (dispatch) => {
    // type: GET_CURRENT_USER,
    // payload: user
    API.get('/user/getMe')
        // .then(data => console.log(data.data));
        .then(data => {
            dispatch(setUserType("USER"))
        })
        .catch(e => {});//TODO handle navigate if to login if not logged in
}

const setToken = (token) => ({type: adminConstants.SET_TOKEN, payload: token});
export const setAdmin = (admin) => ({type: adminConstants.SET_ADMIN, payload: admin});


export const login = (credentials) => (dispatch) => {
    console.log('credentiels ', credentials)
    return API.post('auth/login', credentials)
        .then(({data}) => {
            // dispatch(setToken(data));
            localStorage.setItem('token', data);
            // API.get(`users/me`, {
            //     headers: {
            //         AUTHORIZATION: `Bearer_ ${data}`,
            //     }
            // }).then(({ data }) => {
            //     dispatch(setAdmin(data));
            // })
            console.log('logged in successfully')
        })
        .then(res => {
            // API.get('/user/getMe')
            //     // .then(data => console.log(data.data));
            //     .then(data => {
            //         dispatch(setUserType("USER"))//TODO change
            //     });
            dispatch(getCurrentUser());
        });
    /*.then(() => {
        dispatch({
            type: 'USER_LOGIN_SUCCESS', // Define appropriate action type
            payload: { isLoggedIn: true}, // You can include additional user data if needed
        });
    })*//*.catch((error) => {
            console.log(error); // Output: Failed to fetch data!
        })*/
    ;
}

export const register = (credentials) => (dispatch) => {
    return API.post('auth/register', credentials);
}

export const addMenuItem = () => {
    const item = {title: 'menuItem'};
    const token = localStorage.getItem('token')
    API.post('categories/add', item, {
        headers: {
            AUTHORIZATION: `Bearer_ ${token}`,
        },
    })
}
