// Routes for everything in user-routes and blogpost-routes folder
const router = require('express').Router();
const userRoutes = require('./user-routes');
const blogPostRoutes = require('./blogpost-routes');

router.use('/users', userRoutes);
router.use('/blogpost', blogPostRoutes);

module.exports = router;
