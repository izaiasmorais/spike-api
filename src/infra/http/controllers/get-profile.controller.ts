import { Request, Response, NextFunction } from "express";
import { getCurrentUserId } from "../hooks/get-current-user-id";
import { prisma } from "../../../lib/prisma";
import {
	defaultHttpErrorResponse,
	defaultSuccessResponse,
} from "../responses/responses";

export const getProfileController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const payload = getCurrentUserId(req, res, next);

		if (!payload) {
			return;
		}

		const user = await prisma.user.findUnique({
			where: {
				id: payload.userId,
			},
		});

		if (!user) {
			res.status(404).json(defaultHttpErrorResponse("User not found"));
			return;
		}

		res.status(200).json(
			defaultSuccessResponse({
				id: user.id,
				name: user.name,
				email: user.email,
			})
		);
	} catch (error) {
		next(error);
	}
};
