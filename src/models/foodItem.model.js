const mongoose = require("mongoose");

const foodItemSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	img_src: {
		type: String,
		required: true
	}, price: {
		type: Number,
		required: true
	},
	rating: {
		type: Number,
		required: true
	},
	boughtTimes: {
		type: Number,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	tags: {
		type: [String],
		required: true
	},
	veg_nonVeg: {
		type: String,
		required: true
	},
})

const FoodItem = mongoose.model("foodItem", foodItemSchema);

module.exports = FoodItem;