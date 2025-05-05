import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function SingleBook({ token }) {
  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBookDetails() {
      try {
        const response = await fetch(
          `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBookDetails(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchBookDetails();
  }, [id]);

  const handleReserve = async () => {
    try {
      const response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ bookId: bookDetails.id }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || response.statusText);
      }
      alert("Book reserved successfully!");

      setBookDetails((b) => ({
        ...b,
        available: false,
      }));

      console.log(data);
    } catch (err) {
      console.error("Error reserving book:", err);
      alert(err.message || "Failed to reserve the book. Please try again.");
    }
  };

  return (
    <div className="book-details">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && bookDetails && (
        <div>
          <h2>{bookDetails.title}</h2>
          <img
            src={bookDetails.coverimage}
            alt={bookDetails.title}
            style={{ height: "300px" }}
          />
          <p>{bookDetails.author}</p>
          <p>{bookDetails.description}</p>
          <p>
            Status:{" "}
            {bookDetails.available === true ? "Available" : "Not Available"}
          </p>
          <button onClick={() => navigate("/books")}>Back</button>
          {token && (
            <button onClick={() => handleReserve(bookDetails.id)}>
              Reserve
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default SingleBook;
