import type DeliveryAgency from './DeliveryAgency';

export default class Delivery {
	deliveryAgency?: DeliveryAgency;
	trackingNumber?: string;

	constructor({
		deliveryAgency,
		trackingNumber
	}: {
		deliveryAgency?: DeliveryAgency;
		trackingNumber?: string;
	}) {
		this.deliveryAgency = deliveryAgency;
		this.trackingNumber = trackingNumber;
	}
}
