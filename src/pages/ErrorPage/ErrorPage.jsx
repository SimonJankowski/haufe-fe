import { useNavigate } from "react-router-dom";

import { DEFAULT_REDIRECT } from "../../constants/routes";
import "./ErrorPage.css";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoToList = () => {
    navigate(DEFAULT_REDIRECT);
  };

  return (
    <div className="error-page">
      <h1 className="error-code">404</h1>
      <button className="button-go-to-list" onClick={handleGoToList}>
        GO TO LIST VIEW
      </button>
    </div>
  );
};

export default ErrorPage;
