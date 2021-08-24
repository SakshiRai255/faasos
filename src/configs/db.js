const mongoose = require("mongoose");

const connectDB = () => {
	return mongoose.connect("mongodb://localhost:27017/faasos", {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	});
}

module.exports = connectDB;