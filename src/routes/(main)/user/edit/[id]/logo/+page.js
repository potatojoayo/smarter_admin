import { getGym } from '../../../../../../stores/user.js';

export async function load({ params }) {
	let id = params.id;
	let gym = await getGym(id);

	return { gym, id };
}
