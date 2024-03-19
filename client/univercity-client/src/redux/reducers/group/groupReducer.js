import {
    DELETE_GROUP,
    EDIT_GROUP,
    GET_GROUPS,
    SET_PAGE_ELEMENT_COUNT,
    SET_SELECTED_PAGE_INDEX, SET_NAME_FOR_FILTER, SET_NAME_FOR_USER_FILTER
} from "../../actions/actionTypes/groupActionTypes";

const initialState = {
    groups: [],
    selectedPageIndex: {
        index: 0
    },
    totalCount: null,
    elementsPerPage: {
        count: 10
    },
    nameForFilter: {
        text: ""
    },
    nameForUserFilter: {
        text: ""
    }
};

const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case EDIT_GROUP:
            return {
                ...state,
                groups: state.groups.map(group =>
                    group.id === action.payload.group.id ? {...group, name: action.payload.group.name} : group
                )
            };
        case DELETE_GROUP:
            return {
                ...state,
                groups: state.groups.filter(group => group.id !== action.payload.group.id)
            };
        case GET_GROUPS:
            return {
                ...state,
                groups: [...action.payload.groups.sort((a, b) => b.id - a.id)],
                totalCount: Number(action.payload.totalCount)
            };
        case SET_SELECTED_PAGE_INDEX:
            return {
                ...state,
                selectedPageIndex: action.payload.pagIndex
            };
        case SET_PAGE_ELEMENT_COUNT:
            return {
                ...state,
                elementsPerPage: action.payload.elementsPerPage
            };
        case SET_NAME_FOR_FILTER:
            return {
                ...state,
                nameForFilter: action.payload.nameForFilter
            };
        case SET_NAME_FOR_USER_FILTER: {
            return {
                ...state,
                nameForUserFilter: action.payload.nameForUserFilter
            };
        }
        default:
            return state;
    }
};

export default groupReducer;