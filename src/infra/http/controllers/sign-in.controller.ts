import { prisma } from "@/infra/database/prisma/prisma";
import { Request, Response, NextFunction } from "express";
import { env } from "@/infra/env/env";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwtService from "jsonwebtoken";

const signInRequestBodySchema = z.object({
	email: z.string().email("Invalid email"),
	password: z.string().min(6, "Password must have at least 6 characters"),
});

export const signInController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { email, password } = signInRequestBodySchema.parse(req.body);

		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (!user) {
			res.status(400).json({ message: "Invalid Credentials" });
			return;
		}

		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			res.status(400).json({ message: "Invalid Credentials" });
			return;
		}

		jwtService.sign(
			{
				email,
				password,
			},
			env.JWT_SECRET,
			(err: Error | null, token) => {
				if (err) {
					next(err);
				}

				res.set("x-access-token", token).status(200).json();
			}
		);
	} catch (error) {
		next(error);
	}
};
