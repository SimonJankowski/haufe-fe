import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import LoggedInInfo from "../common/LoggedInInfo/LoggedInInfo";
import { setCredentials } from "../../store/slices/authSlice";
import { isValidToken } from "../../helpers/tokenUtils";
import { validateEmail, validatePassword } from "../../helpers/validators";
import { register } from "../../api/authService";
import { DEFAULT_REDIRECT } from "../../constants/routes";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const { token } = authState;
  const usernameGlobal = authState.username;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameValid, setUsernameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  if (token && isValidToken(token)) {
    return <LoggedInInfo username={usernameGlobal} />;
  }

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

    if (!username || !isEmailValid || !isPasswordValid) {
      setUsernameValid(!!username);
      setEmailValid(isEmailValid);
      setPasswordValid(isPasswordValid);
      return;
    }

    try {
      const {
        token,
        username: registeredUsername,
        favorites,
      } = await register(username, email, password);
      dispatch(
        setCredentials({ token, username: registeredUsername, favorites })
      );
      navigate(DEFAULT_REDIRECT);
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data?.msg || error.message
      );
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          className={`form-control ${usernameValid ? "" : "invalid"}`}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={() => setUsernameValid(!!username)}
        />
        {!usernameValid && (
          <div className="error-message">Username is required.</div>
        )}
      </div>
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
        disabled={!usernameValid || !emailValid || !passwordValid}
      >
        Register
      </button>
      <button
        type="button"
        onClick={() => navigate("/login")}
        className={`button button-green`}
      >
        Registered Already
      </button>
    </form>
  );
};

export default RegisterForm;
