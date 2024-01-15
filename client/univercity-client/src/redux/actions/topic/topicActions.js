import {API} from '../../../API/index';
import {ADD_TOPIC, DELETE_TOPIC, EDIT_TOPIC, GET_TOPICS} from "../actionTypes/topicActionTypes";

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

export const getTopics = (topics) => ({
    type: GET_TOPICS,
    payload: {topics}
});

export const getExistingTopics = () => (dispatch) => {
    API.get('/topic/all')
        .then(data => {
            console.log('data is: ', data.data.content)
            dispatch(getTopics(data.data.content))//todo check
        })
}

export const updateTopic = (topic) => (dispatch) => {
    API.put('/topic/update', topic)
        .then(data => {
            dispatch(editTopic(topic))
        })
}

export const removeTopic = (topic) => (dispatch) => {
    API.delete(`/topic/${topic.id}`)
        .then(data => {
            dispatch(deleteTopic(topic))
        })
}

export const createTopic = (topic) => (dispatch) => {
    API.post('/topic/create', topic)
        .then(data => {
            dispatch(getExistingTopics());
        })
}
