import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

import { login, reset } from '../features/auth/authSlice';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Destruct form data
  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    state => state.auth
  );

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(login(userData));
  };

  useEffect(() => {
    if (isError) {
      const messages = message.split('\n');
      messages.forEach(message => toast.error(message));
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isSuccess, isError, message, navigate, dispatch]);

  if (isLoading) return <Spinner />;

  return (
    !user && (
      <div className="col-md-6 offset-md-3 pt-5">
        <h1 className="text-center mb-5">
          Account <span className="text-primary">Login</span>
        </h1>
        <form onSubmit={onSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              id="email"
              className="form-control"
              placeholder="Email"
            />
            <label htmlFor="email" className="form-label mb-1">
              Email
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              id="password"
              className="form-control"
              placeholder="Password"
            />
            <label htmlFor="password" className="form-label mb-1">
              Password
            </label>
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-lg btn-primary shadow-lg">
              Login
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default Login;
