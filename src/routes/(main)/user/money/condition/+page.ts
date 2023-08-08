import { getWallets } from '../../../../../stores/user';
import {
	redirect,
	type Page
} from '@sveltejs/kit';

export async function load({ url }: Page) {
	const page = url.searchParams.get('page');
	const keyword = url.searchParams.get('keyword');
	const sortType =
		url.searchParams.get('sortType');

	if (!page) {
		throw redirect(
			302,
			'/user/money/condition?page=1'
		);
	}
	const result = await getWallets({
		page: page,
		keyword,
		sortType
	});
	const { wallets, totalCount } = result;
	return {
		wallets: wallets,
		totalCount: totalCount,
		page
	};
}
