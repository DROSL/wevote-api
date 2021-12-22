const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Answer = require("./answer");

const PollSchema = Schema({
	title: {
		type: String,
		required: true,
	},
	event: {
		type: Schema.Types.ObjectId,
		ref: "Event",
		required: true,
	},
	type: {
		type: String,
		default: "bar",
	},
	votesPerParticipant: {
		type: Number,
		default: 1,
	},
	allowCustomAnswers: {
		type: Boolean,
		default: false,
	},
	activeUntil: {
		type: Date,
		default: null,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

PollSchema.pre("remove", async function (next) {
	await Answer.deleteMany({ poll: this._id });
	next();
});

module.exports = mongoose.model("Poll", PollSchema);