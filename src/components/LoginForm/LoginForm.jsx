import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import LoggedInInfo from "../common/LoggedInInfo/LoggedInInfo";
import { isValidToken } from "../../helpers/tokenUtils";
import { setCredentials } from "../../store/slices/authSlice";
import { validateEmail, validatePassword } from "../../helpers/validators";
import { login } from "../../api/authService";
import { DEFAULT_REDIRECT } from "../../constants/routes";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, username } = useSelector((state) => state.auth);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  if (token && isValidToken(token)) {
    return <LoggedInInfo username={username} />;
  }

  const handleNewChance = () => {
    setError(null);
    setEmail("");
    setPassword("");
  };

  const handleEmailValidation = () => {
    const isValid = validateEmail(email);
    setEmailValid(isValid);
    return isValid;
  };

  const handlePasswordValidation = () => {
    const isValid = validatePassword(password);
    setPasswordValid(isValid);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      setEmailValid(isEmailValid);
      setPasswordValid(isPasswordValid);
      return;
    }

    try {
      const { token, username, favorites } = await login(email, password);
      dispatch(setCredentials({ token, username, favorites }));
      navigate(DEFAULT_REDIRECT);
    } catch (error) {
      setError(error.response?.data?.msg || "somethingwent wrong");
    }
  };

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button className="button" onClick={handleNewChance}>
          Try again
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className={`form-control ${emailValid ? "" : "invalid"}`}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleEmailValidation}
        />
        {!emailValid && (
          <div className="error-message">Please enter a valid email.</div>
        )}
      </div>
      <div className="form-group">
        <input
          type="password"
          className={`form-control ${passwordValid ? "" : "invalid"}`}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={handlePasswordValidation}
        />
        {!passwordValid && (
          <div className="error-message">
            Password must be at least 6 characters.
          </div>
        )}
      </div>
      <button
        type="submit"
        className={`button`}
        disabled={!emailValid || !passwordValid}
      >
        Login
      </button>
      <button
        type="button"
        onClick={() => navigate("/register")}
        className={`button button-green`}
      >
        Register
      </button>
    </form>
  );
};

export default LoginForm;
