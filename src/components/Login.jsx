import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function UserLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Login failed");
      }

      const { token } = await res.json();
      onLogin(token);
      localStorage.setItem("token", token);
      
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="login-form">
      <h1>Login</h1>
      {error && (
        <p style={{ color: "red", fontWeight: "bold" }}>
            {error}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => {setEmail(e.target.value); setError(null)}}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="login-button" type="submit">
          Login
        </button>
      </form>

      <div>
        <h3>Don't have an account?</h3>
        <Link className="login-button" to="/register">
          Register
        </Link>
      </div>
    </div>
  );
}

export default UserLogin;
