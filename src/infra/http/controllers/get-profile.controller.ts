import { Request, Response, NextFunction } from "express";
import {
	defaultHttpErrorResponse,
	defaultSuccessResponse,
} from "../responses/responses";
import jwtService from "jsonwebtoken";
import { env } from "@/infra/env/env";

export const getProfileController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const jwt = req.headers["authorization"];

		if (!jwt) {
			res.status(401).json(defaultHttpErrorResponse("Unauthorized"));
			return;
		}

		jwtService.verify(jwt, env.JWT_SECRET, (err, userInfo) => {
			if (err) {
				res.status(401).json(defaultHttpErrorResponse("Unauthorized"));
				return;
			}

			res.status(200).json(defaultSuccessResponse({ userInfo }));
		});
	} catch (error) {
		next(error);
	}
};
