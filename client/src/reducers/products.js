import * as types from "../actions";

const INITIAL_STATE = {
  productList: null,
  product: null,
  message: null,
  error: null,
};

export default function product(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_PRODUCT_SUCCESS: {
      return {
        ...state,
        productList: action.payload.items,
        message: null,
        error: null,
      };
    }
    case types.CREATE_PRODUCT_SUCCESS: {
      return {
        ...state,
        message: action.payload.message,
        error: null,
      };
    }

    case types.PRODUCT_ERROR: {
      return {
        ...state,
        error: action.payload.error,
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
