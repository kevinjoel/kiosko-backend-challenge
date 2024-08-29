const generatePagination = ({ page = 1, limit = 10, sort = '' }) => {
	const offset = (page - 1) * limit;

	const order = sort
		.split(',')
		.map((sortItem, index, array) => {
			if (index % 2 === 0 && array[index + 1]) {
				return [sortItem, array[index + 1]];
			}
			return null;
		})
		.filter(Boolean);

	return {
		offset,
		limit: parseInt(limit, 10),
		order,
	};
};

module.exports = {
	generatePagination,
};
