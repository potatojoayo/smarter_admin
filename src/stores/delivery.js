import { get, writable } from 'svelte/store';

export const deliveryAgencies = writable([]);

export const selectedDeliveryAgency = writable();
export const trackingNumber = writable();
export const deliveryItemPhotoImage = writable();
export const deliveryItemPhotoFile = writable();

export function getDeliveryAgencies() {
	deliveryAgencies.set([
		{
			id: 1,
			name: '로젠택배'
		},

		{
			id: 2,
			name: '대한통운'
		}
	]);
	selectedDeliveryAgency.set(
		get(deliveryAgencies)[0]
	);
}
