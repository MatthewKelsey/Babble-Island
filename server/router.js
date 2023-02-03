const Router = require('express')
const router = Router()
const userCTRL = require('./Controllers/userController')

router.post('/register', userCTRL.registerUser )


router.post('/login' ,userCTRL.login)

router.get('/users' , userCTRL.getUsers)



module.exports= router