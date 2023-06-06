const { validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

const Contact = require('../models/contactModel');

/**
 * @route GET /api/contacts
 * @desc Get all users contacts
 * @access Private
 */
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user: req.user.id });
  res.status(200).json(contacts);
});

/**
 * @route POST /api/contacts
 * @desc Set new Contact
 * @access Private
 */
const setContact = asyncHandler(async (req, res) => {
  //   console.log(req.body);
  //   if (!req.body.name) {
  //     res.status(400);
  //     throw new Error('name is required');
  //   }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(
      errors
        .array()
        .map(error => error.msg)
        .join('\n')
    );
  }

  // Check if user exists
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Get data from request body
  const { name, email, phone, type } = req.body;

  const contact = await Contact.create({
    name,
    email,
    phone,
    type,
    user: req.user.id,
  });
  res.status(201).json(contact);
});

/**
 * @route PUT /api/contacts/:id
 * @desc Update contact
 * @access Private
 */
const updateContact = asyncHandler(async (req, res) => {
  // Lookup the contact to update
  const contact = await Contact.findById(req.params.id);

  // Make sure the contact exists
  if (!contact) {
    res.status(400);
    throw new Error('Contact not found');
  }

  // Check if user exists
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure that the logged in user matches the contact user
  if (contact.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  // Update the contact
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedContact);
});

/**
 * @route DELETE /api/contacts/:id
 * @desc Delete contact
 * @access Private
 */
const deleteContact = asyncHandler(async (req, res) => {
  // Lookup the contact to delete
  const contact = await Contact.findById(req.params.id);

  // Make sure the contact exists
  if (!contact) {
    res.status(400);
    throw new Error('Contact not found');
  }

  // Check if user exists
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure that the logged in user matches the contact user
  if (contact.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await Contact.findByIdAndRemove(req.params.id);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getContacts,
  setContact,
  updateContact,
  deleteContact,
};
