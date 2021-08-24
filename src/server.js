const express = require("express");

const connectDB = require("./configs/db");

// Getting models
const User = require('./models/user.model');
const FoodItem = require("./models/foodItem.model")

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