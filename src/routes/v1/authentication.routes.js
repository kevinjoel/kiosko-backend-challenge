const { Router } = require('express');
const AuthenticationControllers = require('../../controllers/authentication.controllers');
const { requestBodyValidator } = require('../../middlewares/validators.middleware');
const { body } = require('express-validator');

const router = Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Logs in a user.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       401:
 *         description: Invalid username or password.
 */
router.post(
	'/login',
	[body(['username', 'password']).notEmpty()],
	requestBodyValidator,
	AuthenticationControllers.login,
);

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registers a new user.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: The desired username for the new user.
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 description: The password for the new user.
 *                 example: StrongPassword123!
 *     responses:
 *       201:
 *         description: User successfully registered.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully.
 *       400:
 *         description: Bad request, likely due to missing or invalid fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User already exists with this username {INPUT_USERNAME} try a different one
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred during registration.
 */
router.post(
	'/register',
	[body(['username', 'password']).notEmpty()],
	requestBodyValidator,
	AuthenticationControllers.register,
);

module.exports = router;
