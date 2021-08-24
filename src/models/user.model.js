const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	number: {
		type: Number,
		required: true,
		minLength: 10,
		maxLength: 10
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
})

const User = mongoose.model("user", userSchema);

module.exports = User;