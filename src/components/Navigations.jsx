import { Link, useNavigate } from "react-router-dom";

function Navigation({ token, setToken }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  return (
    <nav className="navigation">
      <Link to="/">Home</Link>
      <Link to="/books">Books</Link>
      {!token ? (
        <Link to="/login">Login</Link>
      ) : (
        <Link to="/account">Account</Link>
      )}
      <div>
      {token && <button className="logout-button" onClick={handleLogout}>Logout</button>}
      </div>
    </nav>
  );
}

export default Navigation;
