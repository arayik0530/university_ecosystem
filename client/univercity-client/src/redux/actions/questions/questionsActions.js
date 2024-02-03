import {API} from '../../../API/index';

import {
    ADD_QUESTION,
    DELETE_QUESTION,
    EDIT_QUESTION,
    GET_QUESTIONS,
    SET_PAGE_ELEMENT_COUNT,
    SET_TEXT_FOR_FILTER, SET_TOPIC_FOR_FILTER
} from "../actionTypes/questionsActionTypes";
import {SET_SELECTED_PAGE_INDEX} from "../actionTypes/topicActionTypes";

export const addQuestion = (question) => ({
    type: ADD_QUESTION,
    payload: {question}
});

export const deleteQuestion = (question) => ({
    type: DELETE_QUESTION,
    payload: {question}
});

export const editQuestion = (question) => ({
    type: EDIT_QUESTION,
    payload: {question}
});

export const getQuestions = (questions, totalCount) => ({
    type: GET_QUESTIONS,
    payload: {questions, totalCount}
});

export const getExistingQuestions = (selectedPageIndex, elementsPerPage, text, topicId) => (dispatch) => {
    API.get(`/question/all?page=${selectedPageIndex}&size=${elementsPerPage}&text=${text}&topicId=${topicId}`)
        .then(data => {
            const payload = data.data;
            dispatch(getQuestions(payload.content, payload.totalElements));
        }).catch(e => {
    });
}

export const updateQuestion = (question) => (dispatch) => {
    API.put('/question/update', question)
        .then(data => {
            dispatch(editQuestion(question));
        }).catch(e => {
    });
}

export const removeQuestion = (question, selectedPageIndex, elementsPerPage, text, topicId) => (dispatch) => {
    API.delete(`/question/${question.id}`)
        .then(() => {
            dispatch(getExistingQuestions(selectedPageIndex, elementsPerPage, text, topicId))
        })
        .catch(() => {
        });
}

export const createQuestion = (question, selectedPageIndex, elementsPerPage, text, topicId) => (dispatch) => {
    API.post('/question/create', question)
        .then(() => {
            dispatch(getExistingQuestions(selectedPageIndex, elementsPerPage, text, topicId))
        })
        .catch(() => {
        });
}

export const setSelectedPageIndex = (pagIndex) => ({
    type: SET_SELECTED_PAGE_INDEX,
    payload: {pagIndex}
});

export const setPageElementCount = (elementsPerPage) => ({
    type: SET_PAGE_ELEMENT_COUNT,
    payload: {elementsPerPage}
});

export const setTextForFilter = (textForFilter) => ({
    type: SET_TEXT_FOR_FILTER,
    payload: {textForFilter}
});

export const setTopicForFilter = (topicForFilter) => ({
    type: SET_TOPIC_FOR_FILTER,
    payload: {topicForFilter}
});

