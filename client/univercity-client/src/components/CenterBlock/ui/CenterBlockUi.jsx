import React from 'react';
import AdminLeftSideButtonsContainer from "../../AdminLeftSideButtons/AdminLeftSideButtonsContainer";
import AddEditTopicsContainer from "../../AddEdiTopics/functional/AddEditTopicsContainer";
import {ADMIN, USER} from "../../../redux/constants/globalConstants";
import AdminContainer from "../../Admin/functional/AdminContainer";
import UserContainer from "../../User/functional/UserContainer";

export const CenterBlockUi = ({classes, userType}) => {
    console.log(userType)
    return (
        <div className={classes.CenterBlockUi}>
            {ADMIN === userType && <AdminContainer/>}
            {USER === userType && <UserContainer/>}
        </div>
    )
}