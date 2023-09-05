// lazy image
import "react-lazy-load-image-component/src/effects/blur.css";

// ----------------------------------------------------------------------

import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// @mui
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";

import { createStore, applyMiddleware } from "redux";
import { Provider as ReduxProvider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import rootSaga from "./sagas";

// for Redux store
import reducers from "./reducers";
// theme
import ThemeProvider from "./theme";
// routes
import Router from "./routes";

import AuthProvider from "./auth/JwtContext";

// ----------------------------------------------------------------------

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default function App() {
  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        <ThemeProvider>
          <HelmetProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <BrowserRouter>
                <Router />
              </BrowserRouter>
            </LocalizationProvider>
          </HelmetProvider>
        </ThemeProvider>
      </AuthProvider>
    </ReduxProvider>
  );
}
