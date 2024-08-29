const NotFoundParser = (_req, res) => {
	res.status(404).json({ message: 'Not found' });
};

module.exports = {
	NotFoundParser,
};
