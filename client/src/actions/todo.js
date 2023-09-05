import * as types from './index';

// send the request to fetch all todo
export const getTodoRequest = () => ({
  type: types.GET_TODO_REQUEST,
});
// sending the data to redux store of all todo
export const getTodoSuccess = ({ items }) => ({
  type: types.GET_TODO_SUCCESS,
  payload: {
    items,
  },
});

// send the request to fetch todo by id
export const getTodoByIdRequest = (todoId) => ({
  type: types.GET_TODO_BY_ID_REQUEST,
  payload: {
    todoId,
  },
});

// sending the data to redux store of the todo
export const getTodoByIdSuccess = ({ todoDetails }) => ({
  type: types.GET_TODO_BY_ID_SUCCESS,
  payload: {
    todoDetails,
  },
});

export const createTodoRequest = (data) => ({
  type: types.CREATE_TODO_REQUEST,
  payload: {
    ...data,
  },
});

export const createTodoSuccess = ({ message }) => ({
  type: types.CREATE_TODO_SUCCESS,
  payload: {
    message,
  },
});

export const updateTodoRequest = ({ todoData, _id }) => ({
  type: types.UPDATE_TODO_REQUEST,
  payload: {
    todoData,
    _id,
  },
});

export const updateTodoSuccess = ({ message }) => ({
  type: types.UPDATE_TODO_SUCCESS,
  payload: {
    message,
  },
});

export const completeTodoRequest = (ids) => ({
  type: types.COMPLETE_TODO_REQUEST,
  payload: {
    ids,
  },
});

export const completeTodoSuccess = ({ message }) => ({
  type: types.COMPLETE_TODO_SUCCESS,
  payload: {
    message,
  },
});
export const deleteTodoRequest = (ids) => ({
  type: types.DELETE_TODO_REQUEST,
  payload: {
    ids,
  },
});

export const deleteTodoSuccess = ({ message }) => ({
  type: types.DELETE_TODO_SUCCESS,
  payload: {
    message,
  },
});

export const todoError = ({ error }) => ({
  type: types.TODO_ERROR,
  payload: {
    error,
  },
});

export const clearTodoList = () => ({
  type: types.CLEAR_TODO_LIST,
});

export const clearTodo = () => ({
  type: types.CLEAR_TODO,
});

export const clearMessage = () => ({
  type: types.CLEAR_MESSAGE,
});

export const clearError = () => ({
  type: types.CLEAR_ERROR,
});
