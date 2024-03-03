import React from 'react';
import AdminLeftSideButtonsContainer from "../../AdminLeftSideButtons/AdminLeftSideButtonsContainer";
import AddEditTopicsContainer from "../../AddEdiTopics/functional/AddEditTopicsContainer";
import AddEditQuestionsContainer from "../../AddEditQuestions/functional/AddEditQuestionsContainer";
import {adminConstants} from "../../../redux/constants/admin/adminConstants";
import AssignQuizContainer from "../../AssignQuiz/functional/AssignQuizContainer";

export const AdminUi = ({selectedPart, selectPart}) => {
    return (
        <>
            <AdminLeftSideButtonsContainer selectedPart={selectedPart} selectPart={selectPart}/>
            {selectedPart === adminConstants.TOPICS && <AddEditTopicsContainer/>}
            {selectedPart === adminConstants.QUESTIONS && <AddEditQuestionsContainer/>}
            {selectedPart === adminConstants.QUIZ && <AssignQuizContainer/>}
        </>
    )
}