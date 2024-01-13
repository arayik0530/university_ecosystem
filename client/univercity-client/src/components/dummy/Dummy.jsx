import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUser, setUserType} from "../../redux/actions/user/userActions";
import API from "../../API";

const Dummy = () => {
    const dispatch = useDispatch();
    // setInterval(() => {dispatch(getCurrentUser()); console.log("dispatched")}, 10000);
    dispatch(getCurrentUser());
    // console.log("asd");
    // const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    // if(isLoggedIn){
    //     API.get('/user/getMe')
    //         // .then(data => console.log(data.data));
    //         .then(data => {
    //             dispatch(setUserType("USER"))//TODO change
    //         })
    //         .catch(error => {});
    // }
    const userType = useSelector((state) => state.user.userType);
    const backgroundColor = userType === "USER" ? 'red' : 'yellow';
    return (
        <div style={{ height: '300px', width: '300px', background: backgroundColor }}></div>
    );
}

export default Dummy;
