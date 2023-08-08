import { getInventoryOrder } from '../../../../../../stores/inventory.js';
import { goto } from '$app/navigation';

export async function load({ params, url }) {
	let inventoryOrderId = params.id;
	const result = await getInventoryOrder(
		inventoryOrderId
	);
	let order = result.order;
	let suppliers = result.suppliers;

	let category = url.searchParams.get('category');
	let brand = url.searchParams.get('brand');
	let state = url.searchParams.get('state');
	let currentPage = url.searchParams.get('page');

	let query = new URLSearchParams(
		url.searchParams.toString()
	);

	if (
		!category ||
		!brand ||
		!state ||
		!currentPage
	) {
		if (!category) {
			category = '전체';
		}
		if (!brand) {
			brand = '전체';
		}
		if (!state) {
			state = '전체';
		}
		if (!currentPage) {
			currentPage = 1;
		}

		query.set('category', category);
		query.set('brand', brand);
		query.set('state', state);
		query.set('page', currentPage);
		goto(
			`purchase/form/${inventoryOrderId}?${query.toString()}`
		);
	}

	return {
		order,
		suppliers
	};
}
