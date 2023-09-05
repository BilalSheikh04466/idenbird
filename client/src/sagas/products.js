import { takeEvery, call, put, fork } from "redux-saga/effects";
import * as actions from "../actions/products";
import * as authActions from "../actions/auth";
import * as api from "../api/product";
import * as types from "../actions";
import { setSession } from "../auth/utils";

function* getProduct() {
  try {
    const result = yield call(api.getProduct);

    yield put(
      actions.getProductSuccess({
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
        actions.productError({
          error: e.message,
        })
      );
    }
  }
}

function* watchGetProductRequest() {
  yield takeEvery(types.GET_PRODUCT_REQUEST, getProduct);
}

function* createProduct({ payload }) {
  try {
    const formData = new FormData();

    formData.append("productData", JSON.stringify(payload));
    // Add simple key-value pairs

    // Add nested key-value pairs, including file objects
    payload.colorCombination.forEach((color, colorIndex) => {
      color.tones.forEach((tone, toneIndex) => {
        // Append the file to FormData
        formData.append(
          `colorCombination[${colorIndex}].tones[${toneIndex}].shade`,
          tone.shade
        );
      });
    });
    const response = yield call(api.createProduct, formData);

    // yield put(
    //   actions.createProductSuccess({
    //     message: result.data,
    //   })

    // );

    // yield put(actions.getProductRequest());
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
        actions.productError({
          error: e.message,
        })
      );
    }
  }
}

function* watchCreateProductRequest() {
  yield takeEvery(types.CREATE_PRODUCT_REQUEST, createProduct);
}

// function* updateProduct({ payload }) {
//   try {
//     console.log(payload);
//     const result = yield call(api.updateProduct, payload);

//     yield put(
//       actions.updateProductSuccess({
//         message: result.data,
//       })
//     );

//     yield put(actions.getProductRequest());
//   } catch (e) {
//     if (e.message === "Error: Not authorized, no token") {
//       setSession(null);
//       yield put(authActions.logoutRequest());

//       yield put(
//         authActions.loginError({
//           error: e.message,
//         })
//       );
//     } else {
//       yield put(
//         actions.productError({
//           error: e.message,
//         })
//       );
//     }
//   }
// }

// function* watchUpdateProductRequest() {
//   yield takeEvery(types.UPDATE_PRODUCT_REQUEST, updateProduct);
// }

// function* deleteProduct({ payload }) {
//   try {
//     console.log(payload);
//     const result = yield call(api.deleteProduct, payload);

//     yield put(
//       actions.deleteProductSuccess({
//         message: result.data,
//       })
//     );

//     yield put(actions.getProductRequest());
//   } catch (e) {
//     if (e.message === "Error: Not authorized, no token") {
//       setSession(null);
//       yield put(authActions.logoutRequest());

//       yield put(
//         authActions.loginError({
//           error: e.message,
//         })
//       );
//     } else {
//       yield put(
//         actions.productError({
//           error: e.message,
//         })
//       );
//     }
//   }
// }

// function* watchDeleteProductRequest() {
//   yield takeEvery(types.DELETE_PRODUCT_REQUEST, deleteProduct);
// }

const productSagas = [
  fork(watchGetProductRequest),
  fork(watchCreateProductRequest),
  //   fork(watchUpdateProductRequest),
  //   fork(watchDeleteProductRequest),
];

export default productSagas;
