const mongoose = require('mongoose');

// Contact Schema
const contactSchema = new mongoose.Schema(
  {
    // @todo add user ref
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    type: {
      type: String,
      enum: ['personal', 'professional'],
      default: 'personal',
    },
  },
  { timestamps: true }
);

// Contact Model
const Contact = mongoose.model('contact', contactSchema);

module.exports = Contact;
