<script lang="ts">
	import type { ChangeEventHandler } from 'svelte/elements';
	import { formatDate } from '$lib/utils/formatDate.js';

	let date;
	export let classes = '';

	export let onChange: (value) => void | undefined;

	const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		const value = event.currentTarget.value;
		date = new Date(value);
		if (onChange) {
			onChange(value);
		}
	};
</script>

<input
	type="date"
	class="{classes} w-fit px-3 py-2 border rounded text-sm h-10 text-gray-600"
	value={date ? formatDate(new Date(date)) : null}
	on:change={handleChange}
/>
