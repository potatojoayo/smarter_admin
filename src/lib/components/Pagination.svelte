<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let totalCount;
	export let classes = '';
	export let current = null;
	export let onClick = null;
	export let onChange = null;
	let currentPage;
	let query;
	let url = $page.url.pathname;

	let pages: Number[];
	export let count = 20;
	let first;
	let last;
	let max;

	function getUrl() {}

	$: {
		currentPage =
			$page.url.searchParams.get('page');
		query = new URLSearchParams(
			$page.url.searchParams.toString()
		);
		if (current) {
			currentPage = current;
		}
		first =
			Math.floor((currentPage - 1) / 10) * 10 + 1;
		last = first + 9;
		max = Math.ceil(totalCount / count);
		if (max < last) {
			last = max;
		}
		pages = [];
		for (let i = first; i <= last; i++) {
			pages.push(i);
		}
	}
</script>

<div
	class="{classes} flex justify-center bg-white w-fit mx-auto"
>
	{#if first > 10}
		<button
			on:click={() => {
				if (onChange) {
					return onChange(current - 1);
				}
				if (onClick) {
					onClick();
				}
				query.set('page', `${+currentPage - 1}`);
				goto(`${url}?${query}`);
			}}
			class="w-9 h-9 flex justify-center items-center border-[1px]  text-primary rounded-l-lg cursor-pointer
"
		>
			{'<'}
		</button>
	{/if}
	{#each pages as page}
		<button
			on:click={() => {
				if (onChange) {
					return onChange(page);
				}
				if (onClick) {
					onClick();
				}
				query.set('page', page);
				goto(`${url}?${query}`);
			}}
			class="w-9 h-9 flex justify-center items-center text-md
			cursor-pointer
				border-r-[1px] border-t-[1px] border-b-[1px]
			{page === 1 ? 'border-l-[1px] rounded-l-lg' : ''}
			{page === max ? 'rounded-r-lg' : ''}
			{+currentPage === page
				? 'text-white bg-primary'
				: 'hover:bg-primaryLight text-primary'}"
		>
			{page}
		</button>
	{/each}
	{#if max > last}
		<button
			on:click={() => {
				if (onChange) {
					return onChange(current + 1);
				}
				if (onClick) {
					onClick();
				}
				query.set(
					'page',

					+$page.url.searchParams.get('page') + 1
				);
				goto(`${url}?${query}`);
			}}
			class="w-9 h-9 flex justify-center items-center border-[1px] border-l-0 text-primary rounded-r-lg
			hover:bg-primaryLight cursor-pointer
"
		>
			{'>'}
		</button>
	{/if}
</div>
