import { prisma } from "@/infra/database/prisma/prisma";
import { Request, Response, NextFunction } from "express";
import { defaultSuccessResponse } from "../responses/responses";
import { z } from "zod";

const deleteUserSchema = z.object({
	userId: z.string().uuid("Invalid id"),
});

export const deleteUserController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { userId } = deleteUserSchema.parse(req.params);

		await prisma.user.delete({
			where: {
				id: userId,
			},
		});

		res.status(204).json(defaultSuccessResponse());
	} catch (err) {
		next(err);
	}
};
