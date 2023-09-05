import { all } from "redux-saga/effects";
import authSagas from "./auth";
import todoSagas from "./todo";
import productSagas from "./products";

export default function* rootSaga() {
  yield all([...authSagas, ...todoSagas, ...productSagas]);
}
