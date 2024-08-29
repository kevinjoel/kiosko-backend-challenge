const { Router } = require('express');
const authenticationRoutes = require('./authentication.routes');
const feedsRoutes = require('./feeds.routes');

const router = Router();

router.use('/authentication', authenticationRoutes);
router.use('/feeds', feedsRoutes);

module.exports = router;
