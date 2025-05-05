/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */

import { GetBooks } from "../API/index.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AllBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await GetBooks();
        const data = await res.json();
        setBooks(data);
        console.log(data);
      } catch (error) {
        setError(error);
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);

  if (loading) {
    return <p>Loading Literarture...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  if (books.length === 0) {
    return <p>No books available at the moment.</p>;
  }

  const searchBooks = books.filter((book) => {
    const searchInput = searchTerm.toLowerCase();
    return (
      book.title.toLowerCase().includes(searchInput) ||
      book.author.toLowerCase().includes(searchInput)
    );
  });

  const handleDetails = (id) => {
    navigate(`/books/${id}`);
  };

  return (
    <div className="book-list">
      <input
        type="text"
        placeholder="Search by title or author..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {searchBooks.length === 0 ? (
        <p>No books match “{searchTerm}”</p>
      ) : (
        searchBooks.map((book) => (
          <div key={book.id} className="book-card">
            <img
              src={book.coverimage}
              alt={`${book.title} cover`}
              style={{ height: "150px" }}
            />
            <h2>{book.title}</h2>
            <p>by {book.author}</p>
            <p>
              Status: {book.available === true ? "Available" : "Not Available"}
            </p>
            <button onClick={() => handleDetails(book.id)}>View Details</button>
          </div>
        ))
      )}
    </div>
  );
}

export default AllBooks;
