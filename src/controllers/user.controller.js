const express = require("express");
const router = express.Router();

// Getting models
const User = require('../models/user.model');
const FoodItem = require("../models/foodItem.model")

const genericController = require("./generic.controller")

router.get("/", genericController(User).getAll);

router.post("/", async (req, res) => {
	try {
		const user = await User.create(req.body);
		return res.status(200).json({ user });
	} catch (err) {
		return res.status(400).json({ err: err.message })
	}
})

router.get("/:number", async (req, res) => {
	try {
		const user = await User.findOne({ number: req.params.number });
		return res.status(200).json(user);
	} catch (err) {
		return res.status(400).json(null);
	}
})

router.put("/:number", async (req, res) => {
	try {
		const user = await User.findOneAndUpdate({ number: req.params.number }, req.body, { new: true });
		return res.status(200).json(user);
	} catch (err) {
		return res.status(400).json(null);
	}
})

// router.patch("/:id", genericController(User).updateOne);
router.delete("/:id", genericController(User).deleteOne);


module.exports = router;