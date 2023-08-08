<script>
	export let value = null;
	let open = false;

	let states = ['판매중', '품절', '숨김'];
	export let classes = '';
</script>

<div
	class="{classes} relative border rounded py-2 px-2 flex items-center justify-between cursor-pointer border-gray-500"
	on:click|stopPropagation={() => {
		open = !open;
		const windowClickHandler = () => {
			open = false;
		};
		if (open) {
			window.addEventListener(
				'click',
				windowClickHandler
			);
		} else {
			window.removeEventListener(
				'click',
				windowClickHandler
			);
		}
	}}
>
	<div />
	<span class>
		{value}
	</span>
	<i class="fa fa-chevron-down {classes}" />
	<div
		class="z-30 absolute flex flex-col top-[120%] bg-white w-full border rounded left-0 overflow-hidden {open
			? 'visible'
			: 'invisible'}"
	>
		{#each states as state}
			<div
				class="hover:bg-primary hover:text-white p-2 cursor-pointer text-black"
				on:click|stopPropagation={() => {
					value = state;
					open = false;
				}}
			>
				{state}
			</div>
		{/each}
	</div>
</div>
