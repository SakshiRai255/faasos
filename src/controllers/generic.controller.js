const getAll = (Model) => async (req, res) => {
	try {
		const items = await Model.find({}).lean().exec();
		return res.status(200).json({ items })
	} catch (err) {
		return res.status(400).json({ err })
	}
}

const getOne = (Model) => async (req, res) => {
	try {
		const item = await Model.find({ _id: req.params.id }).lean().exec();
		return res.status(200).json({ item })
	} catch (err) {
		return res.status(400).json({ err })
	}
}

const post = (Model) => async (req, res) => {
	try {
		const item = await Model.create(req.body);
		return res.status(200).json({ item })
	} catch (err) {
		return res.status(400).json({ err })
	}
}

const updateOne = (Model) => async (req, res) => {
	try {
		const item = await Model.findByIdAndUpdate({ _id: req.params.id }, { new: true });
		return res.status(200).json({ item })
	} catch (err) {
		return res.status(400).json({ err })
	}
}

const deleteOne = (Model) => async (req, res) => {
	try {
		const item = await Model.findByIdAndRemove({ _id: req.params.id });
		return res.status(200).json({ item })
	} catch (err) {
		return res.status(400).json({ err })
	}
}

module.exports = (Model) => ({
	getAll: getAll(Model),
	getOne: getOne(Model),
	post: post(Model),
	updateOne: updateOne(Model),
	deleteOne: deleteOne(Model)
});


