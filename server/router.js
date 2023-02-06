const Router = require('express');
const router = Router();
const userCTRL = require('./Controllers/userController');
const characterCTRL = require('./Controllers/characterController');
const storyCTRl = require('./Controllers/storyController')
// USERS 

router.post('/register', userCTRL.registerUser);

router.post('/login', userCTRL.login);

router.get('/users', userCTRL.getUsers);
router.put('/user/:id', userCTRL.updateUserStar)


// CHARACTERS 

router.get('/character', characterCTRL.getAllCharacters)
router.put('/character', characterCTRL.getCharacter);

router.post('/character', characterCTRL.createCharacter)
router.put('/user/:id', userCTRL.updateUserStar)

// STORIES

router.get('/stories', storyCTRl.getStories)

module.exports = router;
