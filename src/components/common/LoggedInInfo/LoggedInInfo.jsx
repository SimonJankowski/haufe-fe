import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { clearCredentials } from "../../../store/slices/authSlice";
import { DEFAULT_REDIRECT } from "../../../constants/routes";

const LoggedInInfo = ({ username }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearCredentials());
    navigate("/login");
  };

  return (
    <div>
      <h1>You are logged in as {username}!</h1>
      <button className="button" onClick={() => navigate(DEFAULT_REDIRECT)}>
        Go to List
      </button>
      <button className="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default LoggedInInfo;
