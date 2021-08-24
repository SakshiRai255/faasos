const express = require("express");

const connectDB = require("./configs/db");

// Getting routes
const userController = require("./controllers/user.controller");
const foodItemController = require("./controllers/foodItem.controller")

const app = express();

app.use(express.json());

app.use("/users", userController);
app.use("/foodItems", foodItemController);


const PORT = 8080;
app.listen(PORT, async () => {
	try {
		await connectDB();
		console.log(`Listening to port: ${PORT}`)
	} catch (err) {
		console.log(`Database not connected`);
	}
})