import { getBankDeliveryInfo } from '../../../../stores/setting.js';

export async function load() {
	let {
		accounts,
		deliveryAgencies,
		extraPriceDelivery
	} = await getBankDeliveryInfo();

	return {
		accounts,
		deliveryAgencies,
		extraPriceDelivery
	};
}
