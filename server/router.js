const Router = require('express');
const router = Router();
const userCTRL = require('./Controllers/userController');
const characterCTRL = require('./Controllers/characterController');

router.post('/register', userCTRL.registerUser);

router.post('/login', userCTRL.login);

router.get('/users', userCTRL.getUsers);

router.put('/character', characterCTRL.getCharacter);

module.exports = router;
