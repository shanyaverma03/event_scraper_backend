import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
	websiteName: {
		type: String,
		required: 'Website is required',
	},
	eventName: {
		type: String,
		required: 'Event name is required',
		unique: true,
	},
	date: {
		type: Date,
		required: 'Date is required',
	},
	location: String,
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
