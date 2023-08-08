import { page } from '$app/stores';
import { get } from 'svelte/store';

export async function printContents() {
	//open()
	open(get(page).url.href);
}
