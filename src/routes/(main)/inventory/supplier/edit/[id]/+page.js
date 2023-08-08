import HttpClient from '../../../../../../data/providers/http_client';
import InventoryService from '../../../../../../data/services/inventory';

export async function load({ params }) {
	let id = params.id;

	let supplier = {};

	if (id && id > 0) {
		const http = HttpClient.getInstance();
		const result = await http.request(
			InventoryService.Supplier,
			{ id }
		);
		supplier = result.supplier;
	}

	return {
		supplier
	};
}
