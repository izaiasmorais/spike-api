import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../../database/prisma/prisma";
import { httpResponseSchema } from "../validators/http";
import bcrypt from "bcrypt";
import z from "zod";

const signUpSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string().min(6),
});

export async function signUp(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/auth/sign-up",
		{
			schema: {
				tags: ["auth"],
				summary: "Registra um novo usuário",
				body: signUpSchema,
				response: {
					201: httpResponseSchema,
					400: httpResponseSchema,
				},
			},
		},
		async (request, reply) => {
			const { name, email, password } = request.body;

			const emailAlreadyExists = await prisma.user.findUnique({
				where: { email },
			});

			if (emailAlreadyExists) {
				return reply.status(400).send({
					success: false,
					errors: ["Email already registered"],
					data: null,
				});
			}

			if (password.length < 6) {
				return reply.status(400).send({
					success: false,
					errors: ["Password must be at least 8 characters"],
					data: null,
				});
			}

			const hashedPassword = await bcrypt.hash(password, 10);

			await prisma.user.create({
				data: {
					name,
					email,
					password: hashedPassword,
				},
			});

			return reply.status(201).send({
				success: true,
				errors: [],
				data: null,
			});
		}
	);
}
