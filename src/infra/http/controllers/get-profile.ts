import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../../database/prisma/prisma";
import { httpResponseSchema } from "../validators/http";
import { auth } from "../middlewares/auth";
import z from "zod";

export async function getProfile(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.get(
			`/profile`,
			{
				schema: {
					tags: ["auth"],
					summary: "Get authenticated user profile",
					security: [{ bearerAuth: [] }],
					response: {
						200: z.object({
							success: z.literal(true),
							errors: z.array(z.string()),
							data: z.object({
								id: z.string().uuid(),
								name: z.string().nullable(),
								email: z.string().email(),
							}),
						}),
						401: httpResponseSchema,
						404: httpResponseSchema,
					},
				},
			},

			async (request, reply) => {
				const userId = await request.getCurrentUserId();

				const user = await prisma.user.findUnique({
					select: {
						id: true,
						email: true,
						name: true,
					},
					where: {
						id: userId,
					},
				});

				if (!user) {
					return reply.status(404).send({
						success: false,
						errors: ["User not found"],
						data: null,
					});
				}

				return reply.send({
					success: true,
					errors: [],
					data: user,
				});
			}
		);
}
