import { orderReducer } from "./orderReducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    order: orderReducer
})