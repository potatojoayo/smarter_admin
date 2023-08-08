import { writable } from 'svelte/store';

export const isSideBarOverlayOpened =
	writable(false);
export const isSideBarOpened = writable(false);

export function toggleSideBar() {
	isSideBarOpened.update((value) => {
		isSideBarOverlayOpened.set(!value);
		return !value;
	});
}

export function onClickOverlay() {
	isSideBarOpened.set(false);
	isSideBarOverlayOpened.set(false);
}
