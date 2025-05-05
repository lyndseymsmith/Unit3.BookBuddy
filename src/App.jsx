import { useState } from "react";
import bookLogo from "./assets/books.png";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navigation from "./components/Navigations.jsx";
import AllBooks from "./components/Books.jsx";
import UserLogin from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Account from "./components/Account.jsx";
import SingleBook from "./components/SingleBook.jsx";

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const navigate = useNavigate();
  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    navigate("/");
  };

  return (
    <>
      <h1>
        <img id="logo-image" src={bookLogo} />
        Library App
      </h1>
      <Navigation token={token} setToken={setToken} />

      <Routes>
        <Route path="/" element={<h2>Welcome to the Library App</h2>} />
        <Route
          path="/login"
          element={!token && <UserLogin onLogin={handleLogin} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/books" element={<AllBooks />} />
        <Route path="/books/:id" element={<SingleBook token={token} />} />
        <Route path="/account" element={<Account token={token} />} />
        <Route path="/reservations" element={<h2>Reservations</h2>} />
      </Routes>
    </>
  );
}

export default App;
