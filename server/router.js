const Router = require('express')
const router = Router()
const userCTRL = require('./Controllers/userController')
const charCTRL = require('./Controllers/CharacterController')

router.post('/register', userCTRL.registerUser )
router.post('/login' ,userCTRL.login)
router.get('/users' , userCTRL.getUsers)


router.post('/character', charCTRL.createCharacter)

router.put('/character', charCTRL.getCharacter)


module.exports= router