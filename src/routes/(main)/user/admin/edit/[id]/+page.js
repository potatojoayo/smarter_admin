import { getAdmin } from '../../../../../../stores/user.js';

export async function load({ params }) {
	let id = params.id;
	let admin = {};
	if (id !== 'new') {
		admin = await getAdmin(id);
	}

	return { admin };
}
