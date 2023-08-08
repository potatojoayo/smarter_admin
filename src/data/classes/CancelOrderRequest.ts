export default class CancelOrderRequest {
	csRequestNumber: string;
	csRequestId: number;
	orderNumber: string;
	orderMasterId: number;
	gymName: string;
	reason?: string;
	priceProducts: number;
	priceWorks: number;
	priceDelivery: number;
	priceTotal: number;
	state: string;
	dateCreated: Date;
	dateCompleted?: Date;
	checked = false;

	constructor({
		csRequestNumber,
		csRequestId,
		orderNumber,
		orderMasterId,
		reason,
		priceWorks,
		priceProducts,
		priceTotal,
		priceDelivery,
		gymName,
		state,
		dateCompleted,
		dateCreated
	}: {
		csRequestNumber: string;
		csRequestId: number;
		orderNumber: string;
		orderMasterId: number;
		gymName: string;
		reason?: string;
		priceProducts: number;
		priceWorks: number;
		priceDelivery: number;
		priceTotal: number;
		state: string;
		dateCreated: Date;
		dateCompleted?: Date;
	}) {
		this.csRequestNumber = csRequestNumber;
		this.csRequestId = csRequestId;
		this.orderNumber = orderNumber;
		this.orderMasterId = orderMasterId;
		this.gymName = gymName;
		this.priceProducts = priceProducts;
		this.priceWorks = priceWorks;
		this.priceDelivery = priceDelivery;
		this.priceTotal = priceTotal;
		this.state = state;
		this.dateCreated = dateCreated;
		this.dateCompleted = dateCompleted;
		this.reason = reason;
	}
}
