import {API} from '../../../API/index';
import {
    ADD_TOPIC,
    DELETE_TOPIC,
    EDIT_TOPIC,
    GET_TOPICS,
    SET_PAGE_ELEMENT_COUNT,
    SET_SELECTED_PAGE_INDEX
} from "../actionTypes/topicActionTypes";

export const addTopic = (topic) => ({
    type: ADD_TOPIC,
    payload: {topic}
});

export const deleteTopic = (topic) => ({
    type: DELETE_TOPIC,
    payload: {topic}
});

export const editTopic = (topic) => ({
    type: EDIT_TOPIC,
    payload: {topic}
});

export const getTopics = (topics, totalCount) => ({
    type: GET_TOPICS,
    payload: {topics, totalCount}
});

export const getExistingTopics = (selectedPageIndex, elementsPerPage) => (dispatch) => {
    API.get(`/topic/all?page=${selectedPageIndex}&size=${elementsPerPage}`)
        .then(data => {
            const payload = data.data;
            dispatch(getTopics(payload.content, payload.totalElements));
        }).catch(e => {
    });
}

export const updateTopic = (topic) => (dispatch) => {
    API.put('/topic/update', topic)
        .then(data => {
            dispatch(editTopic(topic));
        }).catch(e => {
    });
}

export const removeTopic = (topic, selectedPageIndex, elementsPerPage) => (dispatch) => {
    API.delete(`/topic/${topic.id}`)
        // .then(data => {
        //     dispatch(deleteTopic(topic));
        // })
        .then(() => {
            dispatch(getExistingTopics(selectedPageIndex, elementsPerPage))
        });
}

export const createTopic = (topic, selectedPageIndex, elementsPerPage) => (dispatch) => {
    API.post('/topic/create', topic)
        .then(() => {
            dispatch(getExistingTopics(selectedPageIndex, elementsPerPage))
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

