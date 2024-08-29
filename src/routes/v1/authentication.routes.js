const { Router } = require('express');
const AuthenticationControllers = require('../../controllers/authentication.controllers');
const { requestBodyValidator } = require('../../middlewares/validators.middleware');
const { body } = require('express-validator');

const router = Router();

router.post(
	'/login',
	[body(['username', 'password']).notEmpty()],
	requestBodyValidator,
	AuthenticationControllers.login,
);

router.post(
	'/register',
	[body(['username', 'password']).notEmpty()],
	requestBodyValidator,
	AuthenticationControllers.register,
);

module.exports = router;
