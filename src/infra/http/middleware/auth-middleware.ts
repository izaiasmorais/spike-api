import { Request, Response, NextFunction } from "express";
import { defaultHttpErrorResponse } from "../responses/responses";
import { env } from "@/infra/env/env";
import jwt from "jsonwebtoken";

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.headers["authorization"];

	if (!token) {
		res.status(401).json(defaultHttpErrorResponse("Unauthorized"));
		return;
	}

	jwt.verify(token, env.JWT_SECRET, (err) => {
		if (err) {
			res.status(403).end();
			return;
		}
		next();
	});
};
