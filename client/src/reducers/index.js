import { combineReducers } from "redux";
import AuthReducer from "./auth";
import TodoReducer from "./todo";
import ProductReducer from "./products";

export default combineReducers({
  Auth: AuthReducer,
  Todo: TodoReducer,
  Product: ProductReducer,
});
