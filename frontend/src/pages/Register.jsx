import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  // Destruct form data
  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      return;
    }
  };

  return (
    <div className="col-md-6 offset-md-3 pt-5">
      <h1 className="text-center mb-5">
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-floating mb-3">
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            id="name"
            className="form-control"
            placeholder="Name"
          />
          <label htmlFor="name" className="form-label mb-1">
            Name
          </label>
        </div>
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
        <div className="form-floating mb-3">
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
            id="password2"
            className="form-control"
            placeholder="Confirm Password"
          />
          <label htmlFor="password2" className="form-label mb-1">
            Confirm Password
          </label>
        </div>
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-lg btn-primary shadow-lg">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
