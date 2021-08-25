const express = require("express");
const bodyParser = require("body-parser");
const path = require("path")

const connectDB = require("./configs/db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Getting routes
const userController = require("./controllers/user.controller");
const foodItemController = require("./controllers/foodItem.controller")
const categoryController = require("./controllers/category.controller")


app.use("/users", userController);
app.use("/foodItems", foodItemController);
app.use("/categories", categoryController);

// Landing Page
app.get("/", async (req, res) => {
	try {
		res.render("landingPage");
	} catch (err) {
		return res.status(400).json({ err: err.message });
	}
})

app.get("/collections", async (req, res) => {
	try {
		res.render("collections");
	} catch (err) {
		return res.status(400).json({ err: err.message });
	}
})

app.get("/checkout", async (req, res) => {
	try {
		res.render("checkout");
	} catch (err) {
		return res.status(400).json({ err: err.message });
	}
})

app.get("/order", async (req, res) => {
	try {
		res.render("order");
	} catch (err) {
		return res.status(400).json({ err: err.message });
	}
})

app.get("/profile", async (req, res) => {
	try {
		res.render("profile");
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