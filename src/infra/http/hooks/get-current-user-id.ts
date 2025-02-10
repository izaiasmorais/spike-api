import { Request, Response, NextFunction } from "express";
import { defaultHttpErrorResponse } from "../responses/responses";
import { env } from "../../env/env";
import jwt from "jsonwebtoken";


export const getCurrentUserId = (
	req: Request,
	res: Response,
	next: NextFunction
): { userId: string } | undefined => {
	const token = req.headers["authorization"];

	if (!token) {
		res.status(401).json(defaultHttpErrorResponse("Unauthorized"));
		return;
	}

	try {
		const { sub } = jwt.verify(token, env.JWT_SECRET) as jwt.JwtPayload;

		if (!sub) {
			res.status(401).json(defaultHttpErrorResponse("Unauthorized"));
			return;
		}

		return { userId: sub };
	} catch (error) {
		next(error);
	}
};
