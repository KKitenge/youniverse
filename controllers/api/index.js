const router = require('express').Router();

const characterRoutes = require('./character-routes');
const userRoutes = require('./user-routes');

router.use('/character', characterRoutes);
router.use('/users', userRoutes);

module.exports = router;