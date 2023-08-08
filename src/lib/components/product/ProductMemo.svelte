<script>
	export let productMaster = '';
</script>

<div
	class="flex mt-5 border p-5 rounded bg-white"
>
	<div class="w-full flex flex-col">
		<span class="text-lg mr-1">상품메모</span>
		<div class="flex items-center mt-2 ">
			<textarea
				class="border rounded p-2 mr-1 text-left w-full"
				bind:value={productMaster}
				rows="3"
			/>
		</div>
	</div>
</div>
