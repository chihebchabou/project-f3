import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';

import { logout } from '../features/auth/authSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);

  const onLogOut = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light p-3 border-bottom">
      <div className="container">
        <Link to="/" className="navbar-brand">
          My Contacts
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <li className="nav-item">
                <button className="btn btn-primary" onClick={onLogOut}>
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    <FaUser /> Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <FaSignInAlt /> Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
