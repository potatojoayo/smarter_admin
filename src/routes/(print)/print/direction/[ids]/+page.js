import {
	getWorks,
	getWorksForPrint
} from '../../../../../stores/work.js';

export async function load({ params }) {
	const idsParam = params.ids;
	const ids = idsParam.split(',');
	let result = await getWorksForPrint({ ids });
	let works = result.works;
	return { works };
}
