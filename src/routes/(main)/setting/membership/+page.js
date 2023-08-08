import { getMemberships } from '../../../../stores/setting.js';

export async function load() {
	let memberships = await getMemberships();
	return {
		memberships
	};
}
