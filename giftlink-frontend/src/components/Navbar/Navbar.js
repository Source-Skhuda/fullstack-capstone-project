import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">GiftLink</a>
            <div className={`collapse navbar-collapse mobile-navigation-drawer ${isOpen ? 'show' : ''}`} id="navbarMenu">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/home.html">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/app">Gifts</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/app/search">Search</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link login-btn" href="/app/login">Login</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/app/register">Register</a>
                    </li>
                </ul>
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="show" data-bs-target="#navbarMenu" onClick={toggleNavbar}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
        </nav>
    );
}
