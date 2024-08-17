const router = require('express').Router();

// Import our modular routers for /tips and /feedback
const notesRouter = require('./notes');
const apiRouter = require('./api');

router.use('/notes', notesRouter);
router.use('/api', apiRouter);

module.exports = router;
