const {Router} = require('express');
const {getUser} = require('../controller/user');    
const authenticate = require('../middleware/middleware');


const router = Router();

router.get('/getUser', authenticate, getUser);

module.exports = router;