import { orderReducer } from "../Reducers/reducer";
import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
const routeReducer = combineReducers({
    orderReducer 
})
const middleWare = [thunk];
export const store = createStore(routeReducer, applyMiddleware(...middleWare))
