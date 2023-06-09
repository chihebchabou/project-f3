import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { createContact } from '../features/contacts/contactSlice';

const ContactForm = () => {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });

  const { name, email, phone, type } = contact;

  const dispatch = useDispatch();

  const onChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    dispatch(createContact(contact));
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Add Contact</h2>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="form-label">
          Phone
        </label>
        <input
          type="text"
          name="phone"
          id="phone"
          value={phone}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="mb-3 form-check">
        <input
          type="radio"
          name="type"
          value="professional"
          onChange={onChange}
          checked={type === 'professional'}
          className="form-check-input"
        />
        Professional
      </div>
      <div className="mb-3 form-check">
        <input
          type="radio"
          name="type"
          value="personal"
          onChange={onChange}
          checked={type === 'personal'}
          className="form-check-input"
        />
        Personal
      </div>
      <div className="d-grid gap-2 mb-3">
        <button type="submit" className="btn btn-primary">
          Add Contact
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
