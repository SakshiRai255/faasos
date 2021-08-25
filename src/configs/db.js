const mongoose = require("mongoose");

const connectDB = () => {
	return mongoose.connect("mongodb+srv://faasos:faasos@123@cluster0.jh0ei.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	});
}

module.exports = connectDB;