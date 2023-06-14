const mongoose = require("mongoose");
const Joi = require("joi");

const videoSchema = new mongoose.Schema({
	title: { type: String, required: true },
	desc: { type: String, required: true },
	path: { type: String, required: true },
});

const Video = mongoose.model("Video", videoSchema, "videos");

const validate = (data) => {
	const schema = Joi.object({
		title: Joi.string().required().label("Title"),
		desc: Joi.string().required().label("Description"),
		path: Joi.string().email().required().label("Path"),
	});
	return schema.validate(data);
};
module.exports = { Video, validate };
