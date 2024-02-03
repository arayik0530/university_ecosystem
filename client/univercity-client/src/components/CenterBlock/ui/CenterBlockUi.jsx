import React from 'react';
import AdminLeftSideButtonsContainer from "../../AdminLeftSideButtons/AdminLeftSideButtonsContainer";
import AddEditTopicsContainer from "../../AddEdiTopics/functional/AddEditTopicsContainer";
import {ADMIN} from "../../../redux/constants/globalConstants";
import AdminContainer from "../../Admin/functional/AdminContainer";

export const CenterBlockUi = ({classes, userType}) => {
    return (
        <div className={classes.CenterBlockUi}>
            {ADMIN === userType && <AdminContainer/>}
        </div>
    )
}