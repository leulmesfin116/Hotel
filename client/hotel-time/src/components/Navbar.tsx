import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToRooms = () => {
    setIsMobileMenuOpen(false);
    if (location.pathname === '/') {
      // Already on home page — just scroll
      const el = document.getElementById('rooms-and-suites');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Navigate to home first, then scroll after render
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('rooms-and-suites');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 text-amber-800"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-3xl font-serif text-amber-800 font-extrabold tracking-tight">
            Kedamawi Hotel
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide text-gray-700">
          <button
            onClick={scrollToRooms}
            className="hover:text-amber-800 transition-colors border-b-2 border-transparent hover:border-amber-800 pb-1 cursor-pointer"
          >
            ROOMS
          </button>
          <Link
            to="/booking"
            className="hover:text-amber-800 transition-colors border-b-2 border-transparent hover:border-amber-800 pb-1"
          >
            BOOKING
          </Link>
          <Link
            to="/info"
            className="hover:text-amber-800 transition-colors border-b-2 border-transparent hover:border-amber-800 pb-1"
          >
            HOTEL INFO
          </Link>
          <Link
            to="/contact"
            className="hover:text-amber-800 transition-colors border-b-2 border-transparent hover:border-amber-800 pb-1"
          >
            CONTACT
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-amber-800 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 py-4 px-6 flex flex-col gap-4 text-center text-sm font-semibold tracking-wide text-gray-700 shadow-lg">
          <button
            onClick={scrollToRooms}
            className="hover:text-amber-800 transition-colors py-2 border-b border-gray-100 text-center w-full"
          >
            ROOMS
          </button>
          <Link to="/booking" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-800 transition-colors py-2 border-b border-gray-100">
            BOOKING
          </Link>
          <Link to="/info" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-800 transition-colors py-2 border-b border-gray-100">
            HOTEL INFO
          </Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-800 transition-colors py-2">
            CONTACT
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
