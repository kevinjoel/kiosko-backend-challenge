const sortByDate = (resources, order = 'asc') => {
	return resources.slice().sort((a, b) => {
		if (order === 'asc') {
			return a.date - b.date;
		} else if (order === 'desc') {
			return b.date - a.date;
		} else {
			throw new Error('Invalid sort order. Use "asc" or "desc".');
		}
	});
};

module.exports = {
	sortByDate,
};
