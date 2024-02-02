import {SET_SELECTED_PART} from "../actionTypes/adminActionTypes";

export const setSelectedPart = (part) => ({
    type: SET_SELECTED_PART,
    payload: {part}
});
