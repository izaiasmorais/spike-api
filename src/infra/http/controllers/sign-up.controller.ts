import { prisma } from "../../database/prisma/prisma";
import {
	defaultSuccessResponse,
	defaultHttpErrorResponse,
} from "../responses/responses";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import z from "zod";

const signUpSchema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.string().email("Invalid email"),
	password: z.string().min(6, "Password must have at least 6 characters"),
});

export const signUpController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { name, email, password } = signUpSchema.parse(req.body);

		const userAlreadyExists = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (userAlreadyExists) {
			res.status(400).json(defaultHttpErrorResponse("User already exists"));
			return;
		}

		const hashedPassword = await bcrypt.hash(password, 8);

		await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
			},
		});

		res.status(201).json(defaultSuccessResponse());
	} catch (err) {
		next(err);
	}
};
