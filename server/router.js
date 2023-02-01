const Router = require('express')
const router = Router()
const userCTRL = require('./Controllers/userController')

router.post('/register', userCTRL.registerUser )


router.post('/login' ,userCTRL.login)



module.exports= router