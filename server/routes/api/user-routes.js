const router = require('express').Router();
const {
  makeUser,
  findSingleUser,
  deleteBook,
  saveBook,
  login,
} = require('../../controllers/user-controller');

// middleware used
const { authMiddleware } = require('../../utils/auth');

// use it ANYWHERE we need token
router.route('/').post(createUser).put(authMiddleware, saveBook);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/books/:bookId').delete(authMiddleware, deleteBook);

module.exports = router;
