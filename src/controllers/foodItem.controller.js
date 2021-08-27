const express = require("express");
const router = express.Router();

// Getting models
const User = require('../models/user.model');
const FoodItem = require("../models/foodItem.model")

const genericController = require("./generic.controller")

router.get("/", async (req, res) => {
	try {
		const items = await FoodItem.find({}).populate("category").lean().exec();
		return res.status(200).json({ items })
	} catch (err) {
		return res.status(400).json({ err })
	}
})

// router.get("/", genericController(FoodItem).getAll);

router.get("/:id", async (req, res) => {
	try {
		const item = await FoodItem.findById(req.params.id).populate("category");
		return res.status(200).json({ item });
	} catch (err) {
		return res.status(400).json(null);
	}
})

router.get("/:id", genericController(FoodItem).getOne);
router.post("/", genericController(FoodItem).post);
router.patch("/:id", genericController(FoodItem).updateOne);
router.delete("/:id", genericController(FoodItem).deleteOne);

module.exports = router;