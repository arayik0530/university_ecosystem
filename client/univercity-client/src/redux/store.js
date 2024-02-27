// import {applyMiddleware, combineReducers, compose, createStore} from "redux";
// import {thunk} from "redux-thunk";
import { configureStore } from '@reduxjs/toolkit';
import {combineReducers, compose} from "redux";
import userReducer from "./reducers/user/userReducer";
import topicReducer from "./reducers/topic/topicReducer";
import adminReducer from "./reducers/admin/adminReducer";
import questionsReducer from "./reducers/questions/questionsReducer";
import messageReducer from "./reducers/message/messageReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const reducers = combineReducers({
    user: userReducer,
    topic: topicReducer,
    admin: adminReducer,
    questions: questionsReducer,
    message: messageReducer
});

const store = configureStore({ reducer: reducers })

// const store = createStore(reducers, composeEnhancers(
//     applyMiddleware(thunk),
// ));

export default store;
