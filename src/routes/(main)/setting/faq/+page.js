import { goto } from '$app/navigation';
import { getFaqs } from '../../../../stores/common.js';

export async function load({ url }) {
	const now = new Date();

	let dateFrom = url.searchParams.get('dateFrom');
	let dateTo = url.searchParams.get('dateTo');
	let page = url.searchParams.get('page');

	if (!dateFrom || !dateTo || !page) {
		let query = new URLSearchParams(
			url.searchParams.toString()
		);
		if (!dateFrom)
			query.set(
				'dateFrom',
				new Date(
					now.getFullYear(),
					now.getMonth() - 1,
					1,
					0,
					0,
					0
				).toISOString()
			);
		if (!page) query.set('page', '1');
		if (!dateTo) {
			now.setDate(now.getDate() + 1);
			now.setHours(0);
			now.setMinutes(0);
			now.setSeconds(0);
			query.set('dateTo', now.toISOString());
		}

		await goto(
			`/setting/faq?${query.toString()}`
		);
		return {};
	}
	let faqs = [];
	let totalCount = 0;
	let result = await getFaqs(
		url.searchParams.get('page'),
		url.searchParams.get('dateFrom'),
		url.searchParams.get('dateTo')
	);
	faqs = result.faqs;
	totalCount = result.totalCount;
	if (faqs.length === 0) {
		faqs.push({
			title: '새 자주묻는 질문',
			isActive: true
		});
	}
	return {
		faqs,
		totalCount
	};
}
