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
	address: {
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
			quantity: {
				type: String
			}
		}
	],
	orders: [{
		name: {
			type: String,
			required: true
		},
		quantity: {
			type: Number
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
		}
	}]
}, {
	versionKey: false,
	timestamps: true
})

const User = mongoose.model("user", userSchema);

module.exports = User;