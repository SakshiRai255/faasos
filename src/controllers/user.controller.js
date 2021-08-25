const express = require("express");
const router = express.Router();

// Getting models
const User = require('../models/user.model');
const FoodItem = require("../models/foodItem.model")

const genericController = require("./generic.controller")

router.get("/", genericController(User).getAll);

router.post("/", async (req, res) => {
	try {
		console.log(req.body);
		const user = await User.create(req.body);
		window.localStorage.setItem("loggedUser", user);
		return res.status(200).render("landing");
	} catch (err) {
		return res.status(400).json({err: err.message})
	}
})

router.get("/:id", genericController(User).getOne);
// router.post("/", genericController(User).post);
router.patch("/:id", genericController(User).updateOne);
router.delete("/:id", genericController(User).deleteOne);


module.exports = router;