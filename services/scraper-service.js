import puppeteer from 'puppeteer';
import jsdom from 'jsdom';

const { JSDOM } = jsdom;

export async function scrapeWebsite(scrapeConfig) {
	const { url, eventsContainerSelectors, extractEvent } = scrapeConfig;

	console.log('Launching browser...');
	const browser = await puppeteer.launch();
	try {
		const eventsList = [];

		console.log('Opening new page...');
		const page = await browser.newPage();

		console.log(`Visiting ${url}`);
		console.log('Waiting for website to fully load... This might take a while.');
		await page.goto(url);

		console.log('Fetching data from browser...');
		const websiteName = await page.evaluate(() => document.querySelector('title').innerText);

		const eventsDomOuterHtml = await page.evaluate(() => document.body.outerHTML);
		console.log('eventsDomOuterHtml received from browser!');

		const eventsDom = new JSDOM(eventsDomOuterHtml);
		const eventsNodeList = eventsDom.window.document.querySelectorAll(eventsContainerSelectors);
		console.log('eventsNodeList extracted from eventsDom!');

		eventsNodeList.forEach(eventNode => {
			eventsList.push(extractEvent(eventNode, websiteName));
		});

		await browser.close();

		console.log(`Events List ready containing ${eventsList.length} events`);

		return eventsList;
	} catch (e) {
		console.log(e);
		await browser.close();
		return [];
	}
}

// scrapeWebsite({
// 	url: 'https://www.techmeme.com/events',
// 	eventsContainerSelectors: 'div.rhov > a',
// 	extractEvent: (eventNode, websiteName) => {
// 		const dates = eventNode.children.item(0).textContent.split('-');
// 		const date = dates[0].concat(' 2022');
// 		const eventName = eventNode.children.item(1).textContent;
// 		const location = eventNode.children.item(2).textContent;

// 		return {
// 			websiteName,
// 			eventName,
// 			date,
// 			location,
// 		};
// 	},
// });
