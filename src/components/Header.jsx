import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { signOut, selectIsAuthenticated, selectUser, selectAuthLoading } from '../store/slices/authSlice';
import logo from '/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const loading = useSelector(selectAuthLoading);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      const result = await dispatch(signOut()).unwrap();
      navigate('/signin');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <header
      className={`bg-gradient-to-r from-gray-900 to-gray-800 text-white transition-all duration-300 z-50 ${isSticky ? 'fixed top-0 left-0 right-0 shadow-md' : 'relative'
        }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <button onClick={() => navigate('/')} className="flex items-center">
          <img src={logo} alt="My Tinerary Logo" className="h-8 mr-2" />
          <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
            My Tinerary
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-lg hover:text-emerald-400 transition-colors duration-300">
            Home
          </Link>
          <Link to="/cities" className="text-lg hover:text-emerald-400 transition-colors duration-300">
            Cities
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 px-4 py-2 rounded-lg transition-all duration-300"
              >
                {user?.photo ? (
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-white/20"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-white font-bold">
                      {user?.name?.[0]?.toUpperCase()}
                    </span>
                  </div>
                )}
                <span className="font-medium">{user?.name}</span>
              </button>

              <button
                onClick={handleLogout}
                className={`text-gray-300 hover:text-red-400 transition-colors duration-300 flex items-center gap-2 ${loading ? 'opacity-50 pointer-events-none' : ''
                  }`}
                title="Logout"
                disabled={loading}
              >
                {loading ? 'Logging out...' : <FaSignOutAlt size={20} />}
              </button>
            </div>
          ) : (
            <Link
              to="/signin"
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-2 rounded-lg hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 flex items-center gap-2"
            >
              <FaUser className="text-sm" />
              Login
            </Link>
          )}
        </nav>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-2xl md:hidden"
          aria-label="Toggle menu"
        >
          <FaBars />
        </button>

        <div
          className={`fixed inset-0 bg-black/50 md:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          onClick={() => setIsMenuOpen(false)}
        />

        <div
          className={`absolute top-full left-0 right-0 bg-gray-800 md:hidden transform transition-all duration-300 ease-in-out ${isMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-full pointer-events-none'
            }`}
        >
          <div className="flex flex-col p-4 space-y-4">
            <Link
              to="/"
              className="text-lg hover:text-emerald-400 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/cities"
              className="text-lg hover:text-emerald-400 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Cities
            </Link>

            {isAuthenticated ? (
              <>
                <button
                  onClick={() => {
                    navigate('/dashboard');
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 px-4 py-2 rounded-lg transition-all duration-300"
                >
                  {user?.photo ? (
                    <img
                      src={user.photo}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-white/20"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-white font-bold">
                        {user?.name?.[0]?.toUpperCase()}
                      </span>
                    </div>
                  )}
                  <span className="font-medium">{user?.name}</span>
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className={`text-gray-300 hover:text-red-400 transition-colors duration-300 flex items-center justify-center gap-2 ${loading ? 'opacity-50 pointer-events-none' : ''
                    }`}
                  disabled={loading}
                >
                  {loading ? 'Logging out...' : 'Sign Out'} <FaSignOutAlt size={20} />
                </button>
              </>
            ) : (
              <Link
                to="/signin"
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-2 rounded-lg hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 flex items-center justify-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaUser className="text-sm" />
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;