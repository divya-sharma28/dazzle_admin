import { Link } from "react-router-dom";
import "../styles/NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found-container">
        <div className="not-found-content">
          <h1>404</h1>
          <p>Page not found</p>
          <Link to="/" className="home-btn">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;