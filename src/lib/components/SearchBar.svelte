<script>
	import InputText from './InputText.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';

	let value;
	export let classes = '';
	export let onKeyUp = () => {};
	$: {
		value = $page.url.searchParams.get('keyword');
	}
	let keyword;
</script>

<div class="flex items-center {classes}">
	<i
		class="fa fa-search text-xl text-gray-500 mr-2"
	/>
	<form
		action="submit"
		on:submit|preventDefault={async () => {
			let query = new URLSearchParams(
				$page.url.searchParams.toString()
			);
			query.set('keyword', keyword);
			query.set('page', 1);
			await goto(`?${query.toString()}`);
		}}
	>
		<InputText
			{onKeyUp}
			{value}
			classes="min-w-[300px]"
			placeholder="검색"
			onInput={(e) => {
				keyword = e.target.value;
			}}
		/>
	</form>
</div>
