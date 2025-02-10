import { prisma } from "../../../lib/prisma";
import { Request, Response, NextFunction } from "express";
import { defaultSuccessResponse } from "../responses/responses";
import { env } from "../../env/env";
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
				sub: user.id,
			},
			env.JWT_SECRET,
			{ expiresIn: "1h" },
			(err: Error | null, token) => {
				if (err) {
					next(err);
				}

				res.set("x-access-token", token).status(200).json(
					defaultSuccessResponse({
						token,
					})
				);
			}
		);
	} catch (error) {
		next(error);
	}
};
