import { Request, Response } from "express";
import Word from "../models/word";
import errorHandler from "../utils/errorHandler";

interface Word {
	name: string;
	translate: string;
	description?: string;
	createdAt: Date;
}

async function getAll(req: Request, res: Response) {
	try {
		const words: Word[] = await Word.find();

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

async function getById(req, res) {
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

async function create(req, res) {
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

async function update(req, res) {
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

async function remove(req, res) {
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

export {
	getAll,
	getById,
	create,
	update,
	remove
}