const axios = require('axios');
const { sortByDate } = require('../utils/array.utils');

const BASE_URL = process.env.NEWSPAPER_API || 'https://chroniclingamerica.loc.gov';

const newspaperAxios = axios.create({
	baseURL: BASE_URL,
});

const findNewsPaper = async ({ page = 1, year1, year2, terms }) => {
	try {
		const { data } = await newspaperAxios.get('search/titles/results', {
			params: {
				format: 'json',
				page,
				year1,
				year2,
				terms,
			},
		});

		const items = data?.items || [];
		const sanitizedItems = items.map((item) => {
			return {
				title: item?.title,
				type: item?.type || null,
				publisher: item?.publisher || null,
				language: item?.language || [],
				date: item?.start_year || null,
			};
		});

		return {
			resources: sortByDate(sanitizedItems, 'desc'),
			totalResourcesPages: Math.ceil(data?.totalItems / 20),
		};
	} catch (error) {
		throw new Error(error);
	}
};

module.exports = {
	findNewsPaper,
};
