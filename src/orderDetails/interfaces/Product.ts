export interface Product {
	id: number;
	price: number;
	discount: { active: boolean; discountPercent: number } | null;
}
