import * as types from "./index";

// send the request to fetch all product
export const getProductRequest = () => ({
  type: types.GET_PRODUCT_REQUEST,
});
// sending the data to redux store of all product
export const getProductSuccess = ({ items }) => ({
  type: types.GET_PRODUCT_SUCCESS,
  payload: {
    items,
  },
});

// send the request to fetch product by id
export const getProductByIdRequest = (productId) => ({
  type: types.GET_PRODUCT_BY_ID_REQUEST,
  payload: {
    productId,
  },
});

// sending the data to redux store of the product
export const getProductByIdSuccess = ({ productDetails }) => ({
  type: types.GET_PRODUCT_BY_ID_SUCCESS,
  payload: {
    productDetails,
  },
});

export const createProductRequest = (data) => ({
  type: types.CREATE_PRODUCT_REQUEST,
  payload: {
    ...data,
  },
});

export const createProductSuccess = ({ message }) => ({
  type: types.CREATE_PRODUCT_SUCCESS,
  payload: {
    message,
  },
});

// export const updateProductRequest = ({ productData, _id }) => ({
//   type: types.UPDATE_PRODUCT_REQUEST,
//   payload: {
//     productData,
//     _id,
//   },
// });

// export const updateProductSuccess = ({ message }) => ({
//   type: types.UPDATE_PRODUCT_SUCCESS,
//   payload: {
//     message,
//   },
// });

// export const deleteProductRequest = (ids) => ({
//   type: types.DELETE_PRODUCT_REQUEST,
//   payload: {
//     ids,
//   },
// });

// export const deleteProductSuccess = ({ message }) => ({
//   type: types.DELETE_PRODUCT_SUCCESS,
//   payload: {
//     message,
//   },
// });

export const productError = ({ error }) => ({
  type: types.PRODUCT_ERROR,
  payload: {
    error,
  },
});

// export const clearProductList = () => ({
//   type: types.CLEAR_PRODUCT_LIST,
// });

// export const clearProduct = () => ({
//   type: types.CLEAR_PRODUCT,
// });

export const clearMessage = () => ({
  type: types.CLEAR_MESSAGE,
});

export const clearError = () => ({
  type: types.CLEAR_ERROR,
});
