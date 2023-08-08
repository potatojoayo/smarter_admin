<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let onSelect = null;
	$: currentCategory =
		$page.url.searchParams.get('category') ?? '';
	$: currentSubCategory =
		$page.url.searchParams.get('sub-category') ??
		'';
	function getUrl(parent, child = '') {
		let queryParam = new URLSearchParams(
			$page.url.searchParams.toString()
		);
		queryParam.set('category', parent);
		queryParam.set('sub-category', child);
		queryParam.set('page', 1);

		return '?' + queryParam.toString();
	}

	export let category;
</script>

<a
	class="pl-5
	{currentCategory === category.name &&
	!currentSubCategory
		? 'bg-primary text-white'
		: 'bg-white hover:bg-gray-300'}
	py-2
	flex
	items-center
	rounded
	cursor-pointer"
	on:click|stopPropagation={() => {
		if (onSelect) {
			onSelect();
		} else {
			goto(getUrl(category.name));
		}
	}}
>
	<i class="fa-regular fa-folder text-sm mr-2 " />
	<div>{category.name}</div>
</a>
{#if currentCategory === category.name}
<div
	class="overflow-hidden transition-all duration-500"
>
	{#each category.children as child}
		<div
			class="pl-7 py-2 flex items-center cursor-pointer rounded
	{currentSubCategory === child.name
				? 'bg-primary text-white'
				: 'bg-white hover:bg-gray-300 '}
"
			on:click|stopPropagation={() => {
				goto(getUrl(category.name, child.name));
			}}
		>
			<div class="mr-2">ㄴ</div>
			<div>
				{child.name}
			</div>
		</div>
	{/each}
</div>
{/if}
