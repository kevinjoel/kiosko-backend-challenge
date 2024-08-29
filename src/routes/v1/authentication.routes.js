const { Router } = require('express');

const router = Router();

router.post('/login', function (req, res) {
	res.send('Login');
});

router.post('/register', function (req, res) {
	res.send('Register');
});

module.exports = router;
