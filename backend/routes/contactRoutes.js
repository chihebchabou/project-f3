const router = require('express').Router();
const { body } = require('express-validator');
const {
  getContacts,
  setContact,
  updateContact,
  deleteContact,
} = require('../controllers/contactController');

// router.get('/', getContacts);
// router.post('/', setContact);
// router.put('/:id', updateContact);
// router.delete('/:id', deleteContact);

router
  .route('/')
  .get(getContacts)
  .post(
    body('name', "Please include contact's name").notEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    setContact
  );
router.route('/:id').put(updateContact).delete(deleteContact);

module.exports = router;
