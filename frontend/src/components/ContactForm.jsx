import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  createContact,
  updateContact,
  unsetCurrent,
} from '../features/contacts/contactSlice';

const ContactForm = () => {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });

  const { name, email, phone, type } = contact;
  const { current } = useSelector(state => state.contact);

  const dispatch = useDispatch();

  const onChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current !== null) {
      dispatch(updateContact(contact));
      dispatch(unsetCurrent());
    } else {
      dispatch(createContact(contact));
    }
  };

  const onUnsetCurrent = () => dispatch(unsetCurrent());

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({ name: '', email: '', phone: '', type: 'personal' });
    }
  }, [current]);

  return (
    <form onSubmit={onSubmit}>
      <h2>{current ? 'Update' : 'Add'} Contact</h2>
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
          {current ? 'Update' : 'Add'} Contact
        </button>
      </div>
      {current && (
        <div className="d-grid gap-2 mb-3">
          <button
            type="button"
            className="btn btn-light"
            onClick={onUnsetCurrent}
          >
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
