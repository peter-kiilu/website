import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-gray-100 shadow-lg">
      <div className="flex justify-between items-center px-4 py-3 mx-auto max-w-7xl">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center">
            <span className="text-primary-DEFAULT font-bold text-sm">RC</span>
          </div>
          <h1 className="text-lg md:text-xl font-bold text-black">RC-YIC</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/blog">Blog</NavLink>
            <NavLink to="/activities">Activities</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-primary-dark">
          <ul className="flex flex-col py-2 px-4">
            <MobileNavLink to="/" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
            <MobileNavLink to="/about" onClick={() => setIsOpen(false)}>About</MobileNavLink>
            <MobileNavLink to="/blog" onClick={() => setIsOpen(false)}>Blog</MobileNavLink>
            <MobileNavLink to="/activities" onClick={() => setIsOpen(false)}>Activities</MobileNavLink>
            <MobileNavLink to="/contact" onClick={() => setIsOpen(false)}>Contact</MobileNavLink>
          </ul>
        </div>
      )}
    </header>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        to={to}
        className="text-black hover:text-accent-light transition-colors duration-200 py-2 px-1 inline-block font-medium"
      >
        {children}
      </Link>
    </li>
  );
}

function MobileNavLink({
  to,
  children,
  onClick,
}: {
  to: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <li>
      <Link
        to={to}
        className="block py-3 px-4 text-white hover:bg-primary-light transition-colors duration-200"
        onClick={onClick}
      >
        {children}
      </Link>
    </li>
  );
}
