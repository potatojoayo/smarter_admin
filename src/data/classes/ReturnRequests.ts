export default class ReturnRequests {
	id: number;
	csRequestNumber: string;
	csRequestId: number;
	orderNumber: string;
	gymName: string;
	returnReason: string;
	returnProductsName: string;
	totalReturnPrice: number;
	state: string;
	dateCreated: Date;

	constructor({
		id,
		csRequestNumber,
		orderNumber,
		gymName,
		returnReason,
		returnProductsName,
		totalReturnPrice,
		state,
		dateCreated,
		csRequest
	}: {
		id: number;
		csRequest: {
			id: number;
		};
		csRequestNumber: string;
		orderNumber: string;
		gymName: string;
		returnReason: string;
		returnProductsName: string;
		totalReturnPrice: number;
		state: string;
		dateCreated: Date;
	}) {
		this.id = id;
		this.csRequestNumber = csRequestNumber;
		this.orderNumber = orderNumber;
		this.gymName = gymName;
		this.returnReason = returnReason;
		this.csRequestId = csRequest.id;
		this.returnProductsName = returnProductsName;
		this.totalReturnPrice = totalReturnPrice;
		this.state = state;
		this.dateCreated = dateCreated;
	}
}
