import { getAgencies } from '../../../stores/user.js';
export async function load() {
	let agencies = await getAgencies(1);
	agencies = agencies.agencies.map((a) => a.name);

	return {
		agencies
	};
}
