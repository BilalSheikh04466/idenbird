import { takeEvery, call, put, fork } from "redux-saga/effects";
import * as actions from "../actions/todo";
import * as authActions from "../actions/auth";
import * as api from "../api/todo";
import * as types from "../actions";
import { setSession } from "../auth/utils";

function* getTodo() {
  try {
    const result = yield call(api.getTodo);

    yield put(
      actions.getTodoSuccess({
        items: result.data,
      })
    );
  } catch (e) {
    if (e.message === "Error: Not authorized, no token") {
      setSession(null);
      yield put(authActions.logoutRequest());

      yield put(
        authActions.loginError({
          error: e.message,
        })
      );
    } else {
      yield put(
        actions.todoError({
          error: e.message,
        })
      );
    }
  }
}

function* watchGetTodoRequest() {
  yield takeEvery(types.GET_TODO_REQUEST, getTodo);
}

function* createTodo({ payload }) {
  try {
    const result = yield call(api.createTodo, payload);

    yield put(
      actions.createTodoSuccess({
        message: result.data,
      })
    );
    yield put(actions.getTodoRequest());
  } catch (e) {
    if (e.message === "Error: Not authorized, no token") {
      setSession(null);
      yield put(authActions.logoutRequest());

      yield put(
        authActions.loginError({
          error: e.message,
        })
      );
    } else {
      yield put(
        actions.todoError({
          error: e.message,
        })
      );
    }
  }
}

function* watchCreateTodoRequest() {
  yield takeEvery(types.CREATE_TODO_REQUEST, createTodo);
}

function* updateTodo({ payload }) {
  try {
    console.log(payload);
    const result = yield call(api.updateTodo, payload);

    yield put(
      actions.updateTodoSuccess({
        message: result.data,
      })
    );

    yield put(actions.getTodoRequest());
  } catch (e) {
    if (e.message === "Error: Not authorized, no token") {
      setSession(null);
      yield put(authActions.logoutRequest());

      yield put(
        authActions.loginError({
          error: e.message,
        })
      );
    } else {
      yield put(
        actions.todoError({
          error: e.message,
        })
      );
    }
  }
}

function* watchUpdateTodoRequest() {
  yield takeEvery(types.UPDATE_TODO_REQUEST, updateTodo);
}

function* completeTodo({ payload }) {
  try {
    const result = yield call(api.completeTodo, payload);

    yield put(
      actions.completeTodoSuccess({
        message: result.data,
      })
    );

    yield put(actions.getTodoRequest());
  } catch (e) {
    if (e.message === "Error: Not authorized, no token") {
      setSession(null);
      yield put(authActions.logoutRequest());

      yield put(
        authActions.loginError({
          error: e.message,
        })
      );
    } else {
      yield put(
        actions.todoError({
          error: e.message,
        })
      );
    }
  }
}

function* watchCompleteTodoRequest() {
  yield takeEvery(types.COMPLETE_TODO_REQUEST, completeTodo);
}

function* deleteTodo({ payload }) {
  try {
    console.log(payload);
    const result = yield call(api.deleteTodo, payload);

    yield put(
      actions.deleteTodoSuccess({
        message: result.data,
      })
    );

    yield put(actions.getTodoRequest());
  } catch (e) {
    if (e.message === "Error: Not authorized, no token") {
      setSession(null);
      yield put(authActions.logoutRequest());

      yield put(
        authActions.loginError({
          error: e.message,
        })
      );
    } else {
      yield put(
        actions.todoError({
          error: e.message,
        })
      );
    }
  }
}

function* watchDeleteTodoRequest() {
  yield takeEvery(types.DELETE_TODO_REQUEST, deleteTodo);
}

const todoSagas = [
  fork(watchGetTodoRequest),
  fork(watchCreateTodoRequest),
  fork(watchUpdateTodoRequest),
  fork(watchDeleteTodoRequest),
  fork(watchCompleteTodoRequest),
];

export default todoSagas;
