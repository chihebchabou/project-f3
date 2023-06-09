import axios from 'axios';

const API_URL = '/api/contacts/';

// Create new Contact service
const createContact = async (contactData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, contactData, config);
  return response.data;
};

// Get user contacts service
const getContacts = async token => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// Update users contact service
const updateContact = async (contactData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + contactData._id,
    contactData,
    config
  );
  return response.data;
};

// Delete users contact service

const contactService = {
  createContact,
  getContacts,
  updateContact,
};

export default contactService;
