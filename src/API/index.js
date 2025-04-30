import { useEffect, useState } from "react";
//API base URL: https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api

//Users
//Register a new account: POST /users/register
//Login: POST /users/login
//Get account details: GET /users/me

//Books
//Get all books: GET /books

export function GetBooks () {

  return fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books", {
    method: "GET",
    headers: {"Content-Type": "application/json"}
  })
};

//Get a book's details: GET /books/{id}

// export function getBookDetails(id) {
//   const [bookDetails, setBookDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchBookDetails() {
//       try {
//         const response = await fetch(
//           `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`
//         );
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         setBookDetails(data.book);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchBookDetails();
//   }, [id]);

//   return (
//     <div className="book-details">
//       {loading && <p>Loading...</p>}
//       {error && <p>Error: {error.message}</p>}
//       {!loading && !error && bookDetails && (
//         <div>
//           <h2>{bookDetails.title}</h2>
//           <p>{bookDetails.author}</p>
//           <p>{bookDetails.description}</p>
//         </div>
//       )}
//     </div>
//   );
// }

//Reservations
//Get all reservations: GET /reservations
//Reserve a book: POST /reservations
//Return a book: DELETE /reservations/{id}
