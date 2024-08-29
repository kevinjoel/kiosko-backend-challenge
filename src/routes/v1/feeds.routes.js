const { Router } = require('express');

const router = Router();

router.get('', function (req, res) {
	res.send('GET Feeds');
});

router.post('', function (req, res) {
	res.send('Create feed');
});

router.put('', function (req, res) {
	res.send('Update feed');
});

router.delete('', function (req, res) {
	res.send('Delete feed');
});

module.exports = router;
