import { Request, Response, NextFunction } from "express";
import { defaultHttpErrorResponse } from "./http/responses/responses";
import { ZodError } from "zod";
import { AppError } from "../core/errors/app-error";

export const errorHandler = (
	err: Error,
	_: Request,
	res: Response,
	__: NextFunction
) => {
	if (err instanceof ZodError) {
		res.status(400).json(defaultHttpErrorResponse(err.errors[0].message));
		return;
	}

	if (err instanceof AppError) {
		res.status(err.statusCode).json(defaultHttpErrorResponse(err.message));
		return;
	}

	res.status(500).json(defaultHttpErrorResponse("Internal server error"));
};
