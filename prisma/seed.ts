import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	await prisma.product.deleteMany();

	await prisma.product.createMany({
		data: [
			{
				title: "Tênis Nike G.T. Hustle 2 Masculino",
				slug: "tenis-nike-gt-hustle-2-masculino",
				description:
					"Um passo pode fazer toda a diferença quando se trata de ponto de jogo, como um backdoor layup bem-sucedido...",
				price: 968.99,
				priceWithoutPromotion: 1599.99,
				promotionPercentage: 39,
				onSale: true,
				images: ["https://imgnike-a.akamaihd.net/360x360/028276IDA8.jpg"],
				category: "Basquete",
				rating: 5,
				sizes: [38, 39, 40, 41, 42, 43, 44],
				availableSizes: [39, 40],
			},
			{
				title: "Nike Ja 1 Scratch",
				slug: "nike-ja-1-scratch",
				description:
					"Ja Morant se tornou a superestrela que é hoje, fazendo afundos repetidamente...",
				price: 799.99,
				priceWithoutPromotion: 899.99,
				promotionPercentage: 11,
				onSale: true,
				images: ["https://imgnike-a.akamaihd.net/360x360/02947551A8.jpg"],
				category: "Basquete",
				rating: 4.8,
				sizes: [38, 39, 40, 41, 42, 43, 44],
				availableSizes: [39, 41, 42, 44],
			},
			{
				title: "Nike LeBron Witness 8",
				slug: "nike-lebron-witness-8",
				description:
					"LeBron e FaZe Clan se unem para trazer a você uma coleção enraizada no esporte...",
				price: 899.99,
				priceWithoutPromotion: null,
				promotionPercentage: null,
				onSale: false,
				images: ["https://imgnike-a.akamaihd.net/360x360/027728IDA9.jpg"],
				category: "Basquete",
				rating: 4.9,
				sizes: [38, 39, 40, 41, 42, 43, 44],
				availableSizes: [38, 40, 41, 43],
			},
			{
				title: "Nike Freak 5",
				slug: "nike-freak-5",
				description:
					"O motor interno de Giannis gira de dentro para fora, exigindo um calçado que possa aproveitar suas habilidades...",
				price: 849.99,
				priceWithoutPromotion: 949.99,
				promotionPercentage: 10,
				onSale: true,
				images: ["https://imgnike-a.akamaihd.net/360x360/026812IDA9.jpg"],
				category: "Basquete",
				rating: 4.7,
				sizes: [38, 39, 40, 41, 42, 43, 44],
				availableSizes: [38, 39, 40, 42, 44],
			},
			{
				title: "JA 1",
				slug: "ja-1",
				description:
					"Ja Morant se tornou o superstar que é hoje ao afundar repetidamente jumpers em aros tortos...",
				price: 759.99,
				priceWithoutPromotion: 1299.99,
				promotionPercentage: 42,
				onSale: true,
				images: ["https://imgnike-a.akamaihd.net/360x360/0292087TA12.jpg"],
				category: "Basquete",
				rating: 4.5,
				sizes: [38, 39, 40, 41, 42, 43, 44],
				availableSizes: [41, 42],
			},
			{
				title: "Tênis Nike LeBron XXI Premium Masculino",
				slug: "tenis-nike-lebron-xxi-premium-masculino",
				description:
					"Da última vez, LeBron inverteu o roteiro de seu jogo de tênis como só o Rei consegue...",
				price: 1139.99,
				priceWithoutPromotion: 1899.99,
				promotionPercentage: 40,
				onSale: true,
				images: ["https://imgnike-a.akamaihd.net/360x360/03027915A2.jpg"],
				category: "Basquete",
				rating: 4.5,
				sizes: [38, 39, 40, 41, 42, 43, 44],
				availableSizes: [41, 42],
			},
		],
	});

	console.log("Seed de produtos inserido com sucesso!");
}

main()
	.catch((error) => {
		console.error("Erro ao executar seed:", error);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
