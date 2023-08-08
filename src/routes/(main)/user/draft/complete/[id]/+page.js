import { getDraftRequest } from '../../../../../../stores/product.js';

export async function load({ params }) {
	let id = params.id;
	let draftRequest = await getDraftRequest(id);

	return { draftRequest };
}
