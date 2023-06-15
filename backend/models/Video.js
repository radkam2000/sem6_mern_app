const mongoose = require("mongoose");
const Joi = require("joi");

const videoSchema = new mongoose.Schema({
	fileName: { type: String, required: true },
	title: { type: String, required: true },
	desc: { type: String, required: true },
	path: { type: String, required: true },
});

const Video = mongoose.model("Video", videoSchema, "videos");

const validate = (data) => {
	const schema = Joi.object({
		fileName: Joi.string().required().label("Filename"),
		title: Joi.string().required().label("Title"),
		desc: Joi.string().required().label("Description"),
		path: Joi.string().required().label("Path"),
	});
	return schema.validate(data);
};
module.exports = { Video, validate };
