import { adminConstants } from '../../constants/admin/adminConstants';
import { API } from '../../../API/index';
const setToken = (token) => ({ type: adminConstants.SET_TOKEN, payload: token });
export const setAdmin = (admin) => ({ type: adminConstants.SET_ADMIN, payload: admin });


export const    login = (credentials) => (dispatch) => {
    return API.post('auth/login', credentials)
        .then(({ data }) => {
            dispatch(setToken(data));
            localStorage.setItem('token', data);
            // API.get(`users/me`, {
            //     headers: {
            //         AUTHORIZATION: `Bearer_ ${data}`,
            //     }
            // }).then(({ data }) => {
            //     dispatch(setAdmin(data));
            // })
        })/*.catch((error) => {
            console.log(error); // Output: Failed to fetch data!
        })*/;
}

export const register = (credentials) => (dispatch) => {
    return API.post('auth/register', credentials);
}

export const addMenuItem = () => {
    const item = { title: 'menuItem' };
    const token = localStorage.getItem('token')
    API.post('categories/add', item, {
        headers: {
            AUTHORIZATION: `Bearer_ ${token}`,
        },
    })
}
