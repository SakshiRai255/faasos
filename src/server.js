const express = require("express");
const mongoose = require("mongoose");

const connectDB = () => {
	return mongoose.connect("mongodb://localhost:27017/faasos", {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	});
}

const app = express();

const PORT = 8080;
app.listen(PORT, async () => {
	try {
		await connectDB();
		console.log(`Listening to port: ${PORT}`)
	} catch (err) {
		console.log(`Database not connected`);
	}
})