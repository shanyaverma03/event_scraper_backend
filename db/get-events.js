import { queryDb } from '../utils/helpers.js';

export const getEvents = async queryParams => {
	try {
		const events = await queryDb(queryParams);

		return events.map(event => ({
			websiteName: event.websiteName,
			eventName: event.eventName,
			date: event.date,
			location: event.location,
		}));
	} catch (e) {
		console.error(e);
		return {
			error: e.message,
		};
	}
};
