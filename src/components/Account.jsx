import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Account({ token }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return setLoading(false);

    async function fetchAccount() {
      try {
        const res = await fetch(
          "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        console.log(data);
        if (!res.ok) throw new Error(data.message || res.statusText);
        setUser(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchAccount();
  }, [token]);

  const handleReturn = async (reservationID) => {
    try {
      const response = await fetch(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${reservationID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        let errMsg = response.statusText;
        try {
          const errBody = await response.json();
          errMsg = errBody.message || errMsg;
        } catch {
          // ignore if no json response
        }
        throw new Error(errMsg);
      }
      alert("Book returned successfully!");
      setUser((u) => ({
        ...u,
        reservations: u.reservations.filter((r) => r.id !== reservationID),
      }));
    } catch (err) {
      console.error("Error returning book:", err);
      alert("Could not return book: " + err.message);
    }
  };
  if (loading) return <p>Loading your account…</p>;
  if (error) return <p>Error: {error.message}</p>;
  const { firstname, lastname, email, reservations = [] } = user;
  return (
    <div className="account-page">
      <h2>
        Hello, {firstname} {lastname}!
      </h2>
      <p>Email: {email}</p>

      <h3>Your Reservations</h3>
      {reservations.length === 0 ? (
        <p>You have no books reserved.</p>
      ) : (
        <ul>
          {reservations.map((res) => (
            <li key={res.id} style={{ marginBottom: 8 }}>
              <strong>{res.title}</strong> by {res.author}{" "}
              <button
                onClick={() => handleReturn(res.id)}
                style={{ marginLeft: 12 }}
              >
                Return
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Account;
