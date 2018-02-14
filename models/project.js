const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

let titleLengthChecker = (title) => {
	if (!title) {
		return false;
	} else {

		if (title.length < 5 || title.length > 50) {
			return false;
			return true;
		}
	}
};

let alphaNumericTitleChecker = (title) => {
	if (!title) {
		return false;
	} else {
		const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
		return regExp.test(title);
	}
};

const titleValidators = [
	{
		validator: titleLengthChecker,
		message: 'Title must be more than 5 characters but no more than 50'
	},
	{
		validator: alphaNumericTitleChecker,
		message: 'Title must be alphanumeric'
	}
];

let bodyLengthChecker = (body) => {
	if (!body) {
		return false;
	} else {

		if (body.length < 5 || body.length > 500) {
			return false;
		} else {
			return true;
		}
	}
};

const bodyValidators = [
	{
		validator: bodyLengthChecker,
		message: 'Body must be more than 5 characters but no more than 500.'
	}
];

let commentLengthChecker = (comment) => {
	if (!comment[0]) {
		return false;
	} else {
		if (comment[0].length < 1 || comment[0].length > 200) {
			return false;
		} else {
			return true;
		}
	}
};


const commentValidators = [
	{
		validator: commentLengthChecker,
		message: 'Comments may not exceed 200 characters.'
	}
];

const projectSchema = new Schema({
	title: { 
		type: String, 
		required: true, 
		validate: titleValidators, 
	},
	body: { 
		type: String, 
		required: true, 
		validate: bodyValidators, 
	},
	createdBy: { 
		type: String,
	},
	createdAt: { 
		type: Date, 
		default: Date.now(),
	},
	dueDate: {
		type: Date,
		//required: true,
		default: Date.now()+1,
	},
	projectStatus: {
		type: String,
		default: "Not started",
	},
	numberOfAssignees: { 
		type: Number, 
		default: 0, 
	},
	assignees: { 
		type: Array, 
	},
	comments: [{
		comment: { 
			type: String, 
			validate: commentValidators, 
		},
		commenter: { 
			type: String, 
		}
	}]
});

module.exports = mongoose.model('Project', projectSchema);