const { Router } = require('express');
const authenticationRoutes = require('./authentication.routes.mjs');
const feedsRoutes = require('./feeds.routes.mjs');

const router = Router();

router.use('/authentication', authenticationRoutes);
router.use('/feeds', feedsRoutes);

module.exports = router;
