import { prisma } from "../../../lib/prisma";
import { Request, Response, NextFunction } from "express";
import { defaultSuccessResponse } from "../responses/responses";
import { getCurrentUserId } from "../hooks/get-current-user-id";

export const deleteUserController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const payload = getCurrentUserId(req, res, next);

		if (!payload) {
			return;
		}

		await prisma.user.delete({
			where: {
				id: payload.userId,
			},
		});

		res.status(204).json(defaultSuccessResponse());
	} catch (err) {
		next(err);
	}
};
