import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../../database/prisma/prisma";
import { httpResponseSchema } from "../validators/http";
import bcrypt from "bcrypt";
import z from "zod";

const signInSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

export async function signIn(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/auth/sign-in",
		{
			schema: {
				tags: ["auth"],
				summary: "Autentica um usuário",
				body: signInSchema,
				response: {
					201: z.object({
						success: z.literal(true),
						errors: z.array(z.string()),
						data: z.object({
							token: z.string(),
						}),
					}),
					400: httpResponseSchema,
				},
			},
		},
		async (request, reply) => {
			const { email, password } = request.body;

			const user = await prisma.user.findUnique({
				where: { email },
			});

			if (!user) {
				return reply.status(400).send({
					success: false,
					errors: ["Invalid credentials!"],
					data: null,
				});
			}

			const passwordMatch = await bcrypt.compare(password, user.password);

			if (!passwordMatch) {
				return reply.status(400).send({
					success: false,
					errors: ["Invalid credentials!"],
					data: null,
				});
			}

			const token = await reply.jwtSign(
				{
					sub: user.id,
				},
				{
					sign: {
						expiresIn: "1d",
					},
				}
			);

			return reply.status(201).send({
				success: true,
				errors: [],
				data: {
					token,
				},
			});
		}
	);
}
