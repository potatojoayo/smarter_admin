<script lang="ts">
	import PaginationItem from '$lib/components/pagination/PaginationItem.svelte';
	import { page } from '$app/stores';
	import { changeSearchParam } from '$lib/utils/changeSearchParam';

	const MAX = 10;
	export let totalCount = 0,
		rowCount = 10,
		param = 'page';
	let start, end, pages, totalPages, current;

	$: {
		current = $page.url.searchParams.get(param)
			? +$page.url.searchParams.get(param)
			: 1;
		start =
			Math.floor((current - 1) / MAX) * rowCount +
			1;
		totalPages = Math.ceil(totalCount / rowCount);
		end =
			start + rowCount - 1 < totalPages
				? start + rowCount - 1
				: totalPages;
		pages = Array.from(
			{ length: end - start + 1 },
			(_, k) => k + start
		);
	}

	function goToPage(p: number) {
		changeSearchParam({
			param,
			value: p.toString(),
			noScroll: true
		});
	}
</script>

{#if totalPages > 1}
	<div class="flex">
		{#if start !== 1}
			<PaginationItem
				isFirst
				on:click={() => goToPage(start - 1)}
			>
				{'<'}
			</PaginationItem>
		{/if}
		{#each pages as p}
			<PaginationItem
				isCurrent={p === current}
				isEnd={totalPages === p}
				isFirst={p === 1}
				on:click={() => goToPage(p)}
			>
				{p}
			</PaginationItem>
		{/each}
		{#if end < totalPages}
			<PaginationItem
				isEnd
				on:click={() => goToPage(start + 10)}
				>{'>'}</PaginationItem
			>
		{/if}
	</div>
{/if}
