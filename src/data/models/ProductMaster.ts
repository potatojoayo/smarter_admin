class ProductMaster {
	id: number = -1;
	productNumber?: string;
	name?: string;
	category?: string;
	subCategory?: string;
	brand?: string;
	needDraft?: boolean;
	thumbnail?: string;
	colors = [];
	sizes = [];
	descriptionImage?: string;
	priceConsumer?: number;
	priceParent?: number;
	images = [null];
	inventoryQuantity = 0;
	priceGym = 0;
	priceVendor = 0;
	priceDelivery = 0;
	isDeliveryIndividual?: boolean;
	maxQuantityPerBox?: number;
	state = '숨김';
	thresholdInventoryQuantity = 0;
	goalInventoryQuantity = 0;
	deliveryType?: number;
	dateCreated?: Date;
	dateUpdated?: Date;
	products = [];
}

export default ProductMaster;
