const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ContentSchema = new mongoose.Schema({
	content: {
		type: String,
		required: true,
		trim: true
	},
	imgName: {
		type: String
	},
	img: {
		data: Buffer,
		contentType: String
	},
	type: {
		type: String,
		required: true,
		trim: true
	},
	github: {
		type: String
	},
	demo: {
		type: String
	},
	projTitle: {
		type: String
	},
	projType: {
		type: String
	},
	employer: {
		type: String
	},
	jobTitle: {
		type: String
	},
	location: {
		type: String
	},
	date: {
		type: String
	}
},{ timestamps: true });

const Content = mongoose.model('Content', ContentSchema);
module.exports = Content;