import React from 'react';
import AdminLeftSideButtonsContainer from "../../AdminLeftSideButtons/AdminLeftSideButtonsContainer";
import AddEditTopicsContainer from "../../AddEdiTopics/functional/AddEditTopicsContainer";
import {ADMIN} from "../../../redux/constants/globalConstants";

export const CenterBlockUi = ({classes, userType}) => {
    if(ADMIN === userType) {
        return (
            <div className={classes.CenterBlockUi}>
                <AdminLeftSideButtonsContainer/>
                <AddEditTopicsContainer/>
            </div>
        )
    }
}