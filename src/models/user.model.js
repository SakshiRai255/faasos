const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	number: {
		type: Number,
		required: true,
		min: 1000000000,
		max: 9999999999,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	addresses: {
		addressType: {
			type: String,
		},
		houseNo: {
			type: String,
		},
		landmark: {
			type: String,
		}
	},
	cart: [
		{
			type: mongoose.Types.ObjectId,
			ref: "foodItem",
			quantity: {
				type: Number,
				required: true,
				default: 0
			}
		}

	],
	orders: [{
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
		}
	}]
}, {
	versionKey: false,
	timestamps: true
})

const User = mongoose.model("user", userSchema);

module.exports = User;