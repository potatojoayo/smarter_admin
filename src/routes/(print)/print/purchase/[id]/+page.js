import { getInventoryOrder } from '../../../../../stores/inventory.js';

export async function load({ params }) {
	let inventoryOrderId = params.id;
	const result = await getInventoryOrder(
		inventoryOrderId
	);
	let order = result.order;
	let suppliers = result.suppliers;
	return {
		order,
		suppliers
	};
}
