const Router = require('express');
const router = Router();
const userCTRL = require('./Controllers/userController');
const characterCTRL = require('./Controllers/characterController');
const storyCTRl = require('./Controllers/storyController');
const authMiddleware = require('./middleware/auth');
// USERS 

router.post('/register', userCTRL.registerUser);

router.post('/login', userCTRL.login);

router.get('/users', userCTRL.getUsers);

router.put('/user/:id',authMiddleware, userCTRL.updateUserStar)
router.get('/refresh', userCTRL.refreshUser)
// CHARACTERS 

router.get('/character', characterCTRL.getAllCharacters)
router.put('/character', characterCTRL.getCharacter);

router.post('/character', characterCTRL.createCharacter)


// STORIES

router.get('/stories', storyCTRl.getStories)

module.exports = router;
