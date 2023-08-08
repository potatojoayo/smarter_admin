<script>
	export let selected = null;
	export let options = [];
</script>

<div class="flex mt-2">
	{#each options as option}
		<div
			class="cursor-pointer border-gray-800 border p-1 mr-2 min-w-[40px] flex justify-center
			{selected && selected === option
				? 'bg-primary text-white !border-primary'
				: ''}
"
			on:click={() => {
				selected = option;
			}}
		>
			{option}
		</div>
	{/each}
</div>
