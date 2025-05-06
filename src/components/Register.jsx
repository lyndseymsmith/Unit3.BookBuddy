import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Submitting registration...");

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }
    setPasswordError(null);

    try {
      const res = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstname: firstname.trim(),
            lastname: lastname.trim(),
            email: email.trim(),
            password,
          }),
        }
      );
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Registration failed");
      }
      const { token } = await res.json();
      localStorage.setItem("token", token);
      alert("Registration successful! Welcome to the Library App!");
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  }

  const handleBack = () => {
    navigate("/login");
  };

  return (
    <div className="register-form">
      <form onSubmit={handleSubmit}>
        <label>
          First Name:{""}
          <input
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </label>
        <label>
          Last Name:{""}
          <input
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </label>
        <label>
          Email:{""}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:{""}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button>Submit</button>
        {error && <p>{error}</p>}
      </form>

      <button onClick={handleBack}>Back</button>
    </div>
  );
}

export default Register;
