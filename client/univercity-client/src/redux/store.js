import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {thunk} from "redux-thunk";
// import newsReducer from "./reducers/news/newsReducer";
// import miniNewsReducer from "./reducers/news/miniNewsReducer";
import adminReducers from "./reducers/user/userReducer";
// import menuReducer from "./reducers/menu/menuReducer";
// import subMenuItemsReducer from "./reducers/items/subMenuItemsReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const reducers = combineReducers({
    // news: newsReducer,
    // miniNews: miniNewsReducer,
    user: adminReducers,
    // menu: menuReducer,
    // subMenuItems: subMenuItemsReducer
});

const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunk),
));

export default store;
