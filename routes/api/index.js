const router = require('express').Router();
const userRoutes = require('./user-routes');

// add prefixes to routes ex. `/users`
router.use('/users', userRoutes);

module.exports = router;