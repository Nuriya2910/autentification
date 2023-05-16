const {Router} = require('express')

const { 
    register, 
    login, 
    update
} = require('../middleware/autentification')


const router = Router()

router.post('/', register)
router.get('/', login)
router.put('/', update)

module.exports = router