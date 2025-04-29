import { useState } from 'react'
import bookLogo from './assets/books.png'
import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigations.jsx'

function App() {
  const [token, setToken] = useState(null)

  return (
    <>
      <h1><img id='logo-image' src={bookLogo}/>Library App</h1>
      <Navigation />

      <Routes>
        <Route path='/' element={<h2>Welcome to the Library App</h2>} />
        <Route path='/login' element={<h2>Login</h2>} />
        <Route path='/register' element={<h2>Register</h2>} />
        <Route path='/books' element={<h2>Books</h2>} />
        <Route path='/books/:id' element={<h2>Book Details</h2>} />
        <Route path='/account' element={<h2>Account</h2>} />
        <Route path='/reservations' element={<h2>Reservations</h2>} />
      </Routes>

      {/* <p>Complete the React components needed to allow users to browse a library catalog, check out books, review their account, and return books that they've finished reading.</p>

      <p>You may need to use the `token` in this top-level component in other components that need to know if a user has logged in or not.</p>

      <p>Don't forget to set up React Router to navigate between the different views of your single page application!</p> */}

    </>
  )
}

export default App
