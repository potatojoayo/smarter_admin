import { getBrands } from '../../../../stores/product.js';

export async function load() {
	let brands = await getBrands();

	if (brands.length === 0) {
		brands.push({
			id: -1,
			name: '새브랜드',
			order: 0
		});
	}

	return {
		brands
	};
}
