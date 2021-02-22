const Word = require("../models/word");
const errorHandler = require("../utils/errorHandler");

exports.getAll = async function (req, res) {
	try {
		const words = await Word.find();

		res.status(200).json({
			status: "success",
			results: words.length,
			data: {
				words,
			},
		});
	} catch (e) {
		errorHandler(res, e);
	}
};

exports.getById = async function (req, res) {
	try {
		const word = await Word.findById(req.params.id);

		res.status(200).json({
			status: "success",
			data: {
				word,
			},
		});
	} catch (e) {
		errorHandler(res, e);
	}
};

exports.create = async function (req, res) {
	try {
		const word = await Word.create(req.body);

		res.status(201).json({
			status: "success",
			data: {
				word,
			},
		});
	} catch (e) {
		errorHandler(res, e);
	}
};

exports.update = async function (req, res) {
	try {
		const word = await Word.findByIdAndUpdate(req.params.id, req.body);

		res.status(200).json({
			status: "success",
			message: "Слово успешно обновлено",
            data: req.params.id
		});
	} catch (e) {
		errorHandler(res, e);
	}
};

exports.delete = async function (req, res) {
	try {
		const word = await Word.deleteOne({ _id: req.params.id });

		res.status(204).json({
			status: "success",
			data: req.params.id,
		});
	} catch (e) {
		errorHandler(res, e);
	}
};
