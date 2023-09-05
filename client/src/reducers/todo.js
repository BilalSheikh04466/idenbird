import * as types from '../actions';

const INITIAL_STATE = {
  todoList: null,
  todo: null,
  message: null,
  error: null,
};

export default function todo(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_TODO_SUCCESS: {
      return {
        ...state,
        todoList: action.payload.items,
        message: null,
        error: null,
      };
    }
    case types.CREATE_TODO_SUCCESS: {
      return {
        ...state,
        message: action.payload.message,
        error: null,
      };
    }
    case types.UPDATE_TODO_SUCCESS: {
      return {
        ...state,
        message: action.payload.message,
        error: null,
      };
    }

    case types.COMPLETE_TODO_SUCCESS: {
      return {
        ...state,
        message: action.payload.message,
        error: null,
      };
    }

    case types.DELETE_TODO_SUCCESS: {
      return {
        ...state,
        message: action.payload.message,
        error: null,
      };
    }

    case types.TODO_ERROR: {
      return {
        ...state,
        error: action.payload.error,
      };
    }
    case types.CLEAR_TODO_LIST: {
      return {
        ...state,
        todoList: null,
        message: null,
        error: null,
      };
    }

    case types.CLEAR_TODO: {
      return {
        ...state,
        todo: null,
        message: null,
        error: null,
      };
    }
    case types.CLEAR_MESSAGE: {
      return {
        ...state,
        message: null,
      };
    }
    case types.CLEAR_ERROR: {
      return {
        ...state,
        error: null,
      };
    }

    default: {
      return state;
    }
  }
}
