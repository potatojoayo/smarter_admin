import OrderDetail from '$data/classes/OrderDetail';
import OrderService from '$data/services/OrderService';
import AdditionalOrderMaster from './AdditionalOrderMaster';

export default class OrderMaster {
	id: number;
	nodeId?: string;
	orderNumber: string;
	dateCreated: Date;
	priceTotal: number;
	priceDelivery: number;
	priceToPay: number;
	smarterMoney: number;
	orderState: string;
	memoByAdmin: string;
	isPickUp: boolean;

	gymName?: string;
	agencyName?: string;
	orderer?: string;
	phone?: string;
	paymentMethod?: string;
	paidAmount?: number;
	datePaid?: Date;
	receiver?: string;
	address?: string;
	detailAddress?: string;
	zipCode?: string;
	deliveryRequest?: string;
	details?: OrderDetail[];
	coupon?: {
		name: string;
		price: number;
	};

	additionalOrders: AdditionalOrderMaster[] = [];

	constructor(orderMaster: OrderMasterType) {
		if (typeof orderMaster.id === 'string') {
			this.id = orderMaster.orderMasterId!;
			this.nodeId = orderMaster.id;
		} else {
			this.id = orderMaster.id;
		}
		this.orderNumber = orderMaster.orderNumber;
		this.dateCreated = orderMaster.dateCreated;
		this.priceTotal = orderMaster.priceTotal;
		this.orderState = orderMaster.orderState;
		this.smarterMoney = orderMaster.smarterMoney;
		this.memoByAdmin = orderMaster.memoByAdmin;
		this.isPickUp = orderMaster.isPickUp;
		this.priceDelivery =
			orderMaster.priceDelivery;
		this.priceToPay = orderMaster.priceToPay;
		this.gymName = orderMaster.gymName;
		this.agencyName = orderMaster.agencyName;
		this.orderer = orderMaster.orderer;
		this.phone = orderMaster.phone;
		if (orderMaster.paymentSuccess) {
			this.paymentMethod =
				orderMaster.paymentSuccess.method;
			this.paidAmount =
				orderMaster.paymentSuccess.amount;
			this.datePaid =
				orderMaster.paymentSuccess.requestedAt;
		} else {
			this.paymentMethod =
				orderMaster.paymentRequest?.method;
		}
		this.receiver = orderMaster.receiver;
		this.address = orderMaster.address;
		this.detailAddress =
			orderMaster.detailAddress;
		this.zipCode = orderMaster.zipCode;
		this.deliveryRequest =
			orderMaster.deliveryRequest;
		this.details = orderMaster.details?.map(
			(d) => new OrderDetail(d)
		);
		this.additionalOrders =
			orderMaster.additionalOrders?.map(
				(a) => new AdditionalOrderMaster(a)
			) ?? [];
		this.coupon = orderMaster.coupon;
	}

	static async fromId(
		id: number
	): Promise<OrderMaster> {
		return await OrderService.getOrderMaster({
			id
		});
	}

	static async fromOrderNumber(
		orderNumber: string
	): Promise<OrderMaster> {
		return await OrderService.getOrderMaster({
			orderNumber
		});
	}
	async saveMemo() {
		return await OrderService.saveMemo({
			orderMasterId: this.id,
			memo: this.memoByAdmin
		});
	}
}

interface OrderMasterType {
	id: number | string;
	orderMasterId?: number;
	orderNumber: string;
	dateCreated: Date;
	priceTotal: number;
	smarterMoney: number;
	orderState: string;
	memoByAdmin: string;
	isPickUp: boolean;
	priceDelivery: number;
	priceToPay: number;
	gymName?: string;
	coupon?: {
		name: string;
		price: number;
	};
	agencyName?: string;
	orderer?: string;
	phone?: string;
	paymentRequest?: {
		method: string;
	};
	paymentSuccess?: {
		method: string;
		amount: number;
		requestedAt: Date;
	};
	receiver?: string;
	address?: string;
	detailAddress?: string;
	zipCode?: string;
	deliveryRequest?: string;
	details?: {
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
			workId: number;
		};
		priceTotal: number;
		state: string;
	}[];
	additionalOrders?: {
		id: number;
		orderNumber: string;
		dateCreated: Date;
		priceTotal: number;
		priceToPay: number;
		paymentRequest?: {
			method: string;
		};
		paymentSuccess?: {
			method: string;
			amount: number;
			requestedAt: Date;
		};
		details: {
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
				workId: number;
			};
			priceTotal: number;
			state: string;
		}[];
	}[];
}
