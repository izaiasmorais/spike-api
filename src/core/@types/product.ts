export interface Product {
	id: string;
	title: string;
	slug: string;
	description: string;
	price: number;
	priceWithoutPromotion: number | null;
	promotionPercentage: number | null;
	onSale: boolean;
	images: string[];
	category: string;
	rating: number;
	sizes: number[];
	availableSizes: number[];
}
