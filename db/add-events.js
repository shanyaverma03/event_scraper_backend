import { scrapeWebsite } from '../services/scraper-service.js';
import { sanitizeEventsData } from '../utils/helpers.js';
import Event from '../models/event.js';

export const addEvents = async scrapeConfig => {
	try {
		const eventsList = await scrapeWebsite(scrapeConfig);

		if (eventsList.length > 0) {
			Event.insertMany(
				sanitizeEventsData(eventsList),
				{ ordered: false },
				function (err, docs) {
					if (err) {
						console.log('Encountered error while inserting events to db!');
						console.error(err);
					} else {
						console.log(`${docs.length} events inserted to db successfully.`);
					}
				}
			);
		} else {
			console.log('No data received!!!');
		}
	} catch (e) {
		console.error(e);
	}
};
