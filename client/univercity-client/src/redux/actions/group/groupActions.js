import {API} from '../../../API/index';
import {
    ADD_GROUP,
    DELETE_GROUP,
    EDIT_GROUP,
    GET_GROUPS, SET_NAME_FOR_FILTER, SET_NAME_FOR_USER_FILTER,
    SET_PAGE_ELEMENT_COUNT,
    SET_SELECTED_PAGE_INDEX
} from "../actionTypes/groupActionTypes";

export const addGroup = (group) => ({
    type: ADD_GROUP,
    payload: {group}
});

export const deleteTopic = (group) => ({
    type: DELETE_GROUP,
    payload: {group}
});

export const editGroup = (group) => ({
    type: EDIT_GROUP,
    payload: {group}
});

export const getGroups = (groups, totalCount) => ({
    type: GET_GROUPS,
    payload: {groups: groups, totalCount}
});

export const getExistingGroups = (selectedPageIndex, elementsPerPage, name, username) => (dispatch) => {
    // alert('dispatch')
    API.get(`/group/all?page=${selectedPageIndex}&size=${elementsPerPage}&name=${name}&username=${username}`)
        .then(data => {
            const payload = data.data;
            dispatch(getGroups(payload.content, payload.totalElements));
        }).catch(e => {
    });
}

export const updateGroup = (group) => (dispatch) => {
    API.put('/group/update', group)
        .then(data => {
            dispatch(editGroup(group));
        }).catch(e => {
    });
}

export const removeGroup = (group, selectedPageIndex, elementsPerPage, name, username) => (dispatch) => {
    API.delete(`/group/${group.id}`)
        .then(() => {
            dispatch(getExistingGroups(selectedPageIndex, elementsPerPage, name, username))
        })
        .catch(() => {
        });
}

export const createGroup = (group, selectedPageIndex, elementsPerPage, name, username) => (dispatch) => {
    API.post('/group/create', group)
        .then(() => {
            dispatch(getExistingGroups(selectedPageIndex, elementsPerPage, name, username))
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

export const setNameForFilter = (nameForFilter) => ({
    type: SET_NAME_FOR_FILTER,
    payload: {nameForFilter: nameForFilter}
});

export const setNameForUserFilter = (nameForUserFilter) => ({
    type: SET_NAME_FOR_USER_FILTER,
    payload: {nameForUserFilter: nameForUserFilter}
});

