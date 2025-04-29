/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */

import { Link } from 'react-router-dom'
import { useState } from 'react'

function Navigation({ token, setToken }) {
    const [isLoggedIn, setIsLoggedIn] = useState(!!token)
    
    const handleLogout = () => {
        setToken(null)
        setIsLoggedIn(false)
    }
    
    return (
        <nav className="navigation">
        
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/books">Books</Link>
            {isLoggedIn ? (
            <>
                <Link to="/account">Account</Link>
                <button onClick={handleLogout}>Logout</button>
            </>
            ) : (
            <>
                <Link to="/register">Register</Link>
            </>
            )}
        </nav>
    )
    };
    
    export default Navigation;