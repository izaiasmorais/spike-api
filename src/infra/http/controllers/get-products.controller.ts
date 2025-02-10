import { Request, Response, NextFunction } from "express";
import { defaultSuccessResponse } from "../responses/responses";
import { prisma } from "../../../lib/prisma";

export const getProductsController = async (
	_: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const products = await prisma.product.findMany();

		res.status(200).json(defaultSuccessResponse(products));
	} catch (error) {
		next(error);
	}
};
