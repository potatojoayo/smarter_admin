import {
	getProductMaster,
	getProductMasterNode
} from '../../../../stores/product.js';

export async function load({ params }) {
	let id = params.id;

	let productMaster;
	if (id === 'new') {
		productMaster = {
			productNumber: `${Date.now()}`,
			images: [],
			products: [],
			sizes: [],
			thresholdInventoryQuantity: null,
			goalInventoryQuantity: null,
			priceDelivery: 0,
			colors: [],
			state: '숨김',
			deliveryType: '일반배송상품',
			memo: '상품메모',
		};
	} else {
		if (isNaN(id)) {
			productMaster = await getProductMasterNode(
				id
			);
		} else {
			productMaster = await getProductMaster(+id);
		}

		productMaster.id =
			productMaster.productMasterId;
		delete productMaster.productMasterId;
	}
	return {
		productMaster
	};
}
