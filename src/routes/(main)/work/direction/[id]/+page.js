import { getWork } from '../../../../../stores/work.js';

export async function load({ params, parent }) {
	let id = params.id;

	let result = await getWork(id);
	let work = result.work;
	let subcontractors = result.subcontractors;
	return { work, subcontractors };
}
