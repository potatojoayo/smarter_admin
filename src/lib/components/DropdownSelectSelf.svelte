<script>
	export let options;
	export let classes = '';
	export let value = null;
	let open = false;
	export let placeholder = '';
	export let disabled = false;
	export let onSelect = (option) => {};
</script>

<div
	class="{classes} relative border rounded py-2 px-2 flex items-center justify-between min-w-[200px] cursor-pointer border-gray-500"
	on:click|stopPropagation={() => {
		if (disabled) {
			return;
		}
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
	<span class={value ? '' : 'text-gray-500'}>
		{value ? value : placeholder}
	</span>
	<i class="fa fa-chevron-down text-gray-500" />
	<div
		class="absolute flex flex-col top-[120%] bg-white w-full border rounded left-0 overflow-hidden max-h-[200px] overflow-y-scroll z-30 {open
			? 'visible'
			: 'invisible'}"
	>
		{#each options as option}
			<div
				class="hover:bg-primary hover:text-white p-2 cursor-pointer"
				on:click|stopPropagation={() => {
					value = option;
					open = false;
					onSelect(option);
				}}
			>
				{option}
			</div>
		{/each}
	</div>
</div>
