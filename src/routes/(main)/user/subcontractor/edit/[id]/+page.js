import { getSubcontractorUser } from '../../../../../../stores/user.js';

export async function load({ params }) {
	let id = params.id;
	let subcontractor = {
		user: {}
	};
	if (id !== 'new')
		subcontractor = await getSubcontractorUser(
			id
		);

	return { agency: subcontractor };
}
