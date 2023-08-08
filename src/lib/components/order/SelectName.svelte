<script>
	export let names;
	let input = '';
	export let onAdd = null;
	export let onRemove = null;
	let id = 0;
	function onSubmit(_) {
		names.push({ value: input, id });
		names = names;
		input = '';
		id += 1;
		if (onAdd) {
	//		onAdd();
		}
	}
</script>

<div
	class="flex flex-col flex-1 min-w-[400px] mt-5"
>
	<div class="flex items-end">
		<span class="text mr-1">이름</span>
		<span class="text-xs text-gray-500"
			>도안에 따라 상품에 새겨질 이름을 입력 후
			엔터를 눌러 추가해주세요.</span
		>
	</div>
	<form
		action="submit"
		on:submit|preventDefault={onSubmit}
	>
		<input
			type="text"
			class="border rounded p-2 mt-3 max-w-[300px]"
			bind:value={input}
		/>
	</form>
	<div class="flex flex-wrap mt-5 mr-3 h-10">
		{#each names as name}
			<div
				class="bg-gray-200 px-2 py-1  rounded flex items-center text-sm mr-1"
			>
				{name.value}
				<i
					class="fa fa-circle-x ml-2 text-sm cursor-pointer"
					on:click={() => {
						names = names.filter(
							(n) => n.id !== name.id
						);
						if (onRemove) {
							// onRemove();
						}
					}}
				/>
			</div>
		{/each}
	</div>
</div>
