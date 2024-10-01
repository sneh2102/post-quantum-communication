const { Router } = require('express');
const { register, login, confirmation, logout } = require('../controller/authentication');

// Initialize router instance
const router = Router();

// Define your routes
router.post('/register', register);
router.post('/login', login);
router.get('/confirmation/:token', confirmation);
router.get('/logout',logout);

// Export the router
module.exports = router;




