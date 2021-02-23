import { Response } from "express";

export default (res: Response, error) => {
	res.status(500).json({
		success: false,
		message: error.message ? error.message : error,
	});
};
