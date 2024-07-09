const router = require('express').Router();

// Import our modular routers for /api and /html
const apiRouter = require('./api');
const htmlRouter = require('./html');

router.use('/api', apiRouter);
router.use('/html', htmlRouter);


module.exports = router;