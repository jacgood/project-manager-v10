const router = require('express').Router();
const Users = require('../../controllers/users.controller');

router.post('/register', Users.createUser);
router.post('/login', Users.loginUser);
router.get('/', Users.getUsers);
router.get('/:id', Users.getUser);
router.put('/:id', Users.updateUser);
router.delete('/:id', Users.removeUser);

module.exports = router;
