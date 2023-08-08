import { getInventoryReceived } from '../../../../../../stores/inventory.js';

export async function load({ params }) {
	let receiveId = params.id;
	let result = await getInventoryReceived(
		receiveId
	);
	return {
		receive: result
	};
}
