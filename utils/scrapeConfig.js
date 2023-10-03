export const scrapeConfigs = [
	{
		url: 'https://www.computerworld.com/article/3313417/tech-event-calendar-shows-conferences-and-it-expos-updated.html',
		eventsContainerSelectors: 'tr.odd, tr.even',
		extractEvent: (eventNode, websiteName) => {
			const eventName = eventNode.children.item(0).textContent;
			const date = eventNode.children.item(2).textContent;
			const location = eventNode.children.item(4).textContent;

			return {
				websiteName,
				eventName,
				date,
				location,
			};
		},
	},
	{
		url: 'https://www.techmeme.com/events',
		eventsContainerSelectors: 'div.rhov > a',
		extractEvent: (eventNode, websiteName) => {
			const dates = eventNode.children.item(0).textContent.split('-');
			const date = dates[0].concat(' 2022');
			const eventName = eventNode.children.item(1).textContent;
			const location = eventNode.children.item(2).textContent;

			return {
				websiteName,
				eventName,
				date,
				location,
			};
		},
	},
];
