import { writable } from 'svelte/store';
import {
	closeDeliveryDialog,
	closeDraftDialog,
	closeStartShippingDialog
} from './order';
import {
	closeAddProductDialog,
	closeChangeInventoryDialog
} from './inventory.js';
import { closeSelectDraftDialog } from './user.js';

export const isOverlayOpened = writable(false);

export const isPrinting = writable(false);

export const isLoading = writable(false);

export function onClickOverlay() {
	closeDraftDialog();
	closeStartShippingDialog();
	closeDeliveryDialog();
	closeChangeInventoryDialog();
	closeAddProductDialog();
	closeSelectDraftDialog();
}
