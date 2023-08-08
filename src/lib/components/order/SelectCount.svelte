<script>
	export let selectedCount = 0;
	export let editable = true;
</script>

<div class="flex items-center mt-3">
	<i
		class="fa fa-chevron-left text-gray-800 cursor-pointer mr-2 {selectedCount >
			0
			? 'visible'
			: 'invisible'}"
		on:click={() => {
			selectedCount -= 1;
		}}
	/>
	<div class="border p-2 border-gray-800">
		{selectedCount}
	</div>
	<i
		class="fa fa-chevron-right text-gray-800  cursor-pointer ml-2"
		on:click={() => {
			selectedCount += 1;
		}}
	/>
</div>
