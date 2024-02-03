import React from 'react';
import AdminLeftSideButtonsContainer from "../../AdminLeftSideButtons/AdminLeftSideButtonsContainer";
import AddEditTopicsContainer from "../../AddEdiTopics/functional/AddEditTopicsContainer";
import AddEditQuestionsContainer from "../../AddEditQuestions/functional/AddEditQuestionsContainer";
import {adminConstants} from "../../../redux/constants/admin/adminConstants";

export const AdminUi = ({selectedPart, selectPart}) => {
    return (
        <>
            <AdminLeftSideButtonsContainer selectedPart={selectedPart} selectPart={selectPart}/>
            {selectedPart === adminConstants.TOPICS && <AddEditTopicsContainer/>}
            {selectedPart === adminConstants.QUESTIONS && <AddEditQuestionsContainer/>}
        </>
    )
}