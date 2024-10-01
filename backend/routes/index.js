const { Router } = require('express');
const authenticationRouter = require('./authenticationRouter'); 
const authenticate = require('../middleware/middleware');

const router = Router();

router.get("/me", authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.id); // Ensure you're using await for async operations
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.use("/v1", authenticationRouter);

module.exports = router;
