import { getInventoryOrder } from '../../../../../../stores/inventory.js';

export async function load({ params }) {
	let inventoryOrderId = params.id;
	const result = await getInventoryOrder(
		inventoryOrderId
	);
	let order = result.order;
	let suppliers = result.suppliers;
	order.details.edges.forEach((e) => {
		e.node.receivedQuantity =
			e.node.quantityOrdered;
		e.node.notReceivedQuantity = 0;
		e.node.priceReceived =
			e.node.priceVendorTotal;
	});
	return {
		order,
		suppliers
	};
}
