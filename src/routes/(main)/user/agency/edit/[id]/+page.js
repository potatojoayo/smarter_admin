import { getAgency } from '../../../../../../stores/user.js';

export async function load({ params }) {
	let id = params.id;
	let agency = {
		user: {}
	};
	if (id !== 'new') agency = await getAgency(id);

	return { agency };
}
