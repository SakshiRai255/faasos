const express = require("express");
const router = express.Router();

const Category = require("../models/category.model")

const genericController = require("./generic.controller")

router.get("/", genericController(Category).getAll);
router.get("/:id", genericController(Category).getOne);
router.post("/", genericController(Category).post);
router.patch("/:id", genericController(Category).updateOne);
router.delete("/:id", genericController(Category).deleteOne);

module.exports = router;