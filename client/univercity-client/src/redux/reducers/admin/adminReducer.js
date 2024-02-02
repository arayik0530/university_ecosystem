import {adminConstants} from "../../constants/admin/adminConstants";
import {SET_SELECTED_PART} from "../../actions/actionTypes/adminActionTypes";

const initialState = {
    selectedPart: adminConstants.TOPICS
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SELECTED_PART:
            return {
                ...state,
                selectedPart: action.payload.part
            };
        default:
            return state;
    }
};

export default adminReducer;