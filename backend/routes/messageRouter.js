const {Router} = require('express');
const {sendMessage, getMessages} = require('../controller/message') 
const authenticate  = require('../middleware/middleware');

const router = Router();


router.post('/send-message/:id', authenticate, sendMessage);
router.get('/get-messages/:id', authenticate, getMessages);

module.exports = router;