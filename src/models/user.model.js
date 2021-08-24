const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	number: {
		type: Number,
		required: true,
		min: 100000000,
		max: 999999999
	},
	email: {
		type: String,
		required: true
	},
	addresses: [{
		addressType: {
			type: String,
			required: true
		},
		houseNo: {
			type: String,
			required: true
		},
		landmark: {
			type: String,
			required: true
		}
	}],
	cart: [
		{
			type: [mongoose.Schema.Types.ObjectId],
			ref: "foodItem",
			quantity: {
				type: Number,
				required: true,
				default: 0
			}
		}

	],
	orders: [{
		type: [mongoose.Schema.Types.ObjectId],
		ref: "foodItem",
		quantity: {
			type: Number,
			required: true,
			default: 0
		}
	}]
}, {
	versionKey: false,
	timestamps: true
})

const User = mongoose.model("user", userSchema);

module.exports = User;