import { getCategories } from '../../../../stores/product.js';

export async function load() {
	let categories = await getCategories();

	if (categories.length === 0) {
		categories.push({
			id: -1,
			name: '새 카테고리',
			depth: 0,
			order: 0,
			children: []
		});
	}

	return {
		categories
	};
}
