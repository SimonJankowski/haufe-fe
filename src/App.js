import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import PrivateRoute from "./routing/PrivateRoute";
import { isValidToken } from "./helpers/tokenUtils";
import {
  DetailsPage,
  ErrorPage,
  LoginPage,
  ListPage,
  RegisterPage,
} from "./pages";
import {
  HOME_ROUTE,
  LIST_ROUTE,
  DETAILS_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  ERROR_ROUTE,
  DEFAULT_REDIRECT,
} from "./constants/routes";

function App() {
  const { token } = useSelector((state) => state.auth);
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoute isAuthenticated={isValidToken(token)} />}>
          <Route
            path={HOME_ROUTE}
            element={<Navigate to={DEFAULT_REDIRECT} replace />}
          />
          <Route path={LIST_ROUTE} element={<ListPage />} />
          <Route path={DETAILS_ROUTE} element={<DetailsPage />} />
        </Route>
        <Route path={LOGIN_ROUTE} element={<LoginPage />} />
        <Route path={REGISTER_ROUTE} element={<RegisterPage />} />
        <Route path={ERROR_ROUTE} element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
