export default class OrderDetail {
	id: number;
	productName: string;
	color: string;
	size: string;
	priceProduct: number;
	quantity: number;
	priceWork: number;
	priceWorkLabor: number;
	priceTotal: number;
	state: string;
	draftId?: number;
	workId?: string;
	thumbnail?: string;
	checked = false;
	dateToBeShipped?: Date;
	isDirectDelivery = false;
	userRequest?: string;
	otherOptions?: {
		color: string;
		size: string;
		productId: number;
		priceProduct: number;
	}[];
	changingOption?: {
		color: string;
		size: string;
		productId: number;
		priceProduct: number;
	};

	constructor({
		id,
		product,
		productMaster,
		priceTotal,
		state,
		work,
		quantity,
		draft,
		dateToBeShipped,
		thumbnail,
		isDirectDelivery = false,
		userRequest
	}: {
		id: number;
		productMaster: {
			priceGym: number;
		};
		product: {
			name: string;
			color: string;
			size: string;
			priceAdditional: number;
		};
		quantity: number;
		draft?: {
			id: number;
			priceWork: number;
			priceWorkLabor: number;
		};
		work?: {
			id: string;
		};
		priceTotal: number;
		state: string;
		dateToBeShipped?: Date;
		userRequest?: string;
		isDirectDelivery?: boolean;
		thumbnail?: string;
	}) {
		this.id = id;
		this.productName = product.name;
		this.color = product.color;
		this.size = product.size;
		this.priceProduct =
			productMaster.priceGym +
			product.priceAdditional;
		this.quantity = quantity;
		this.priceWork = draft ? draft.priceWork : 0;
		this.priceWorkLabor = draft
			? draft.priceWorkLabor
			: 0;
		this.priceTotal = priceTotal;
		this.state = state;
		this.draftId = draft?.id;
		this.workId = work?.id;
		this.thumbnail = thumbnail;
		this.isDirectDelivery = isDirectDelivery;
		this.dateToBeShipped = dateToBeShipped;
		this.userRequest = userRequest;
	}
}
