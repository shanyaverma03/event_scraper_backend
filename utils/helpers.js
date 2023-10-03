import Event from '../models/event.js';

//function to ensure data is formatted correctly before inserting into db
export const sanitizeEventsData = eventsList => {
	return eventsList.map(event => {
		return {
			...event,
			date: new Date(event.date),
		};
	});
};

export const queryDb = async queryParams => {
	const { locationType, date, websiteName } = queryParams;

	const queryObject = {};

	if (date) {
		const dates = date.split(',');

		if (dates[0].length > 0) {
			const startDate = new Date(dates[0]);
			queryObject.date = { ...queryObject.date, $gte: startDate };
		}

		if (dates[1].length > 0) {
			const endDate = new Date(dates[1]);
			queryObject.date = { ...queryObject.date, $lte: endDate };
		}
	}

	if (locationType === 'Virtual') {
		queryObject.location = '';
	} else if (locationType === 'Offline') {
		queryObject.location = { $ne: '' };
	}

	if (
		websiteName ===
		'Tech event calendar 2022: Upcoming US shows, conferences, and IT expos | Computerworld'
	) {
		queryObject.websiteName = {
			$eq: 'Tech event calendar 2022: Upcoming US shows, conferences, and IT expos | Computerworld',
		};
	} else if (websiteName === 'All Tech Events - Techmeme') {
		queryObject.websiteName = { $eq: 'All Tech Events - Techmeme' };
	}

	console.log(queryObject);

	return Event.find(queryObject);
};
