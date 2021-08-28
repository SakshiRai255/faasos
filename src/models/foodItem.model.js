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
		type: String,
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
	category: {
		type: mongoose.Types.ObjectId,
		ref: "category",
		required: true
	}
}, {
	versionKey: false,
	timestamps: true
})

const FoodItem = mongoose.model("foodItem", foodItemSchema);

module.exports = FoodItem;