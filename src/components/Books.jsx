/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */

import { GetBooks } from '../API/index.js'
import { useState, useEffect } from 'react'

function AllBooks () {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        return <p>Loading Literarture...</p>
    }
    if (error) {
        return <p>Error: {error.message}</p>
    }
    // if (books.length === 0) {
    //     return <p>No books available at the moment.</p>
    // };

    return (
        <div className="book-list">
            {books.map((book) => (
                <div key={book.id} className="book-card">
                    <img src={book.coverimage} alt={book.title} style={{height:"150px"}}/>
                    <h2>{book.title}</h2>
                    <p>{book.author}</p>
                    {/* <Link to={`/books/${book.id}`}>View Details</Link> */}
                </div>    
            ))}
        </div>
    )
}

export default AllBooks;