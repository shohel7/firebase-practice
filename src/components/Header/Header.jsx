import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav className='space-x-8 text-center py-5 bg-amber-500'>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/logout">Logout</Link>
            <Link to="/register">Register</Link>
        </nav>
    );
};

export default Header;