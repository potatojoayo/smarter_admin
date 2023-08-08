import { getBanners } from '../../../../stores/setting.js';

export async function load() {
	let banners = await getBanners();
	if (banners.length === 0) {
		banners.push({
			name: '새 배너',
			order: 0,
			image: null
		});
	}
	return {
		banners
	};
}
