import React from 'react';
import AdminLeftSideButtonsContainer from "../../AdminLeftSideButtons/AdminLeftSideButtonsContainer";
import AddEditTopicsContainer from "../../AddEdiTopics/AddEditTopicsContainer";

export const CenterBlockUi = ({classes, userType}) => {
    return (
        <div className={classes.CenterBlockUi}>
            <AdminLeftSideButtonsContainer/>
            <AddEditTopicsContainer/>
        </div>
    )
}