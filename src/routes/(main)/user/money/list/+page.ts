import { getGymsSmarterMoneyHistories } from '../../../../../stores/user';
import {
	redirect,
	type Page
} from '@sveltejs/kit';

export async function load({ url }: Page) {
	const now = new Date();
	const page = url.searchParams.get('page');
	const keyword = url.searchParams.get('keyword');
	const year =
		url.searchParams.get('year') ||
		now.getFullYear();
	const month =
		url.searchParams.get('month') ||
		now.getMonth() + 1;

	if (!page) {
		throw redirect(
			302,
			'/user/money/list?page=1'
		);
	}

	const result =
		await getGymsSmarterMoneyHistories({
			keyword,
			year,
			month,
			page: page
		});
	const {
		gymsSmarterMoneyHistories,
		totalCount
	} = result;
	return {
		gymsSmarterMoneyHistories:
			gymsSmarterMoneyHistories,
		totalCount: totalCount,
		page
	};
}
