import React from 'react';
import AdminLeftSideButtonsContainer from "../../AdminLeftSideButtons/AdminLeftSideButtonsContainer";
import AddEditTopicsContainer from "../../AddEdiTopics/functional/AddEditTopicsContainer";
import AddEditQuestionsContainer from "../../AddEditQuestions/functional/AddEditQuestionsContainer";
import {adminConstants} from "../../../redux/constants/admin/adminConstants";
import AssignQuizContainer from "../../AssignQuiz/functional/AssignQuizContainer";
import AddEditGroupsContainer from "../../AddEditGroups/functional/AddEditGroupsContainer";
import ReportContainer from "../../report/functional/ReportContainer";

export const AdminUi = ({selectedPart, selectPart}) => {
    return (
        <>
            <AdminLeftSideButtonsContainer selectedPart={selectedPart} selectPart={selectPart}/>
            {selectedPart === adminConstants.GROUPS && <AddEditGroupsContainer/>}
            {selectedPart === adminConstants.TOPICS && <AddEditTopicsContainer/>}
            {selectedPart === adminConstants.QUESTIONS && <AddEditQuestionsContainer/>}
            {selectedPart === adminConstants.QUIZ && <AssignQuizContainer/>}
            {selectedPart === adminConstants.REPORT && <ReportContainer/>}
        </>
    )
}