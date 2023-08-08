<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let path = $page.url.pathname;
	let businesses = [
		{ path: 'vendor', name: '이리스' },
		{ path: 'agency', name: '지사(체육사)' },
		{ path: 'gym', name: '체육관' }
	];
</script>

<section class="flex">
	{#each businesses as business}
		<div
			class="p-3 border-b-2 cursor-pointer {path.includes(
				business.path
			)
				? 'border-b-primary text-primary'
				: ''}"
			on:click={() => {
				let pathName = $page.url.pathname;
				let pathNames = pathName.split('/');
				pathName =
					pathNames[0] +
					'/' +
					pathNames[1] +
					'/' +
					pathNames[2] +
					'/' +
					business.path;
				goto(pathName);
			}}
		>
			{business.name}
		</div>
	{/each}
</section>
