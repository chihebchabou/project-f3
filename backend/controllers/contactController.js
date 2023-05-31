const { validationResult } = require('express-validator');

/**
 * @route GET /api/contacts
 * @desc Get all users contacts
 * @access Private
 */
const getContacts = (req, res) => {
  res.send('Get all contacts');
};

/**
 * @route POST /api/contacts
 * @desc Set new Contact
 * @access Private
 */
const setContact = (req, res) => {
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
  res.status(201).json(req.body);
};

/**
 * @route PUT /api/contacts/:id
 * @desc Update contact
 * @access Private
 */
const updateContact = (req, res) => {
  res.send(`Contact ${req.params.id} updated`);
};

/**
 * @route DELETE /api/contacts/:id
 * @desc Delete contact
 * @access Private
 */
const deleteContact = (req, res) => {
  res.send(`Contact ${req.params.id} deleted`);
};

module.exports = {
  getContacts,
  setContact,
  updateContact,
  deleteContact,
};
