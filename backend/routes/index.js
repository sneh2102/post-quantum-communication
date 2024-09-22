const {Router} = require('express');
const authenticationRouter = require('./authenticationRouter'); 


const router = Router();

router.use("/v1", authenticationRouter);