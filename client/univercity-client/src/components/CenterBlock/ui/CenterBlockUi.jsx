import React from 'react';
import {ADMIN, USER} from "../../../redux/constants/globalConstants";
import AdminContainer from "../../Admin/functional/AdminContainer";
import UserContent from "../../User/UserContent";

export const CenterBlockUi = ({classes, userType}) => {
    return (
        <div className={classes.CenterBlockUi}>
            {ADMIN === userType && <AdminContainer/>}
            {USER === userType && <UserContent/>}
        </div>
    )
}