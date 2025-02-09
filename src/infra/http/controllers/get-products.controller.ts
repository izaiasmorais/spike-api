import { Request, Response, NextFunction } from "express";
import { prisma } from "@/infra/database/prisma/prisma";
import { defaultSuccessResponse } from "../responses/responses";

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
