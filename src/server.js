const express = require("express");
const path = require("path")

const connectDB = require("./configs/db");

// Getting routes
const userController = require("./controllers/user.controller");
const foodItemController = require("./controllers/foodItem.controller")
const categoryController = require("./controllers/category.controller")

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/users", userController);
app.use("/foodItems", foodItemController);
app.use("/categories", categoryController);

// Landing Page
app.get("/", async (req, res) => {
	try {
		res.render("landingPage.ejs");
	} catch (err) {
		return res.status(400).json({ err: err.message });
	}
})


const PORT = 8080;
app.listen(PORT, async () => {
	try {
		await connectDB();
		console.log(`Listening to port: ${PORT}`)
	} catch (err) {
		console.log(`Database not connected`);
	}
})