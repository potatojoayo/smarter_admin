<script>
	import { gql } from 'graphql-request';
	import { addNewProduct } from '../../../stores/product.js';
	import InputText from '../InputText.svelte';
	import HttpClient from '../../../data/providers/http_client';

	export let productMaster;
	export let oldSizes;
	const client = HttpClient.getInstance();
	let inputSize = '',
		changingSize,
		editingSize = Array(
			productMaster.sizes.length
		).fill(false);

	function onSubmit(_) {
		if (!inputSize) {
			return;
		}
		inputSize = inputSize.trim();
		if (productMaster.sizes.includes(inputSize)) {
			inputSize = '';
			return alert(
				'같은 사이즈는 추가할 수 없습니다.'
			);
		}
		productMaster.sizes.push(inputSize.trim());
		productMaster.sizes = productMaster.sizes;
		for (let color of productMaster.colors) {
			addNewProduct(
				productMaster,
				color,
				inputSize.trim()
			);
		}
		inputSize = '';
	}
</script>

<div
	class="flex flex-col flex-1 border p-5 rounded min-w-[400px] mt-5 bg-white"
>
	<div class="flex items-end">
		<span class="text-lg mr-1 whitespace-nowrap"
			>사이즈</span
		>
		<span class="text-red-500 mr-3">*</span>
		<span class="text-xs text-gray-500"
			>원하시는 사이즈를 입력하신 후 엔터키를 눌러
			추가해주세요.</span
		>
	</div>
	<form
		action="submit"
		on:submit|preventDefault={onSubmit}
	>
		<InputText
			classes="rounded mt-3 max-w-[300px]"
			bind:value={inputSize}
		/>
	</form>
	<div class="flex flex-wrap mt-5 mr-3">
		{#each productMaster.sizes as size, index}
			<div
				class="bg-gray-200 px-2 py-1  rounded flex items-center text-sm mr-1 mt-1"
			>
				{#if editingSize[index]}
					<input
						type="text"
						bind:value={changingSize}
						class="h-8 w-24"
					/>
					<button
						class="mx-4 text-red-500"
						on:click={() =>
							(editingSize[index] = false)}
					>
						취소
					</button>
					<button
						class="text-blue-500"
						on:click={async () => {
							if (
								!confirm(
									'사이즈를 변경하시겠습니까?'
								)
							)
								return;
							const ChangeSize = gql`
								mutation ChangeSize(
									$productMasterId: Int
									$changedSize: String
									$changingSize: String
								) {
									changeSize(
										productMasterId: $productMasterId
										changedSize: $changedSize
										changingSize: $changingSize
									) {
										success
										message
									}
								}
							`;
							const result = await client.request(
								ChangeSize,
								{
									productMasterId:
										productMaster.id,
									changedSize: size,
									changingSize
								}
							);
							const { success, message } =
								result.changeSize;
							alert(message);
							if (success) {
								location.reload();
							}
						}}
					>
						수정
					</button>
				{:else}
					{size}
					<button
						class="fa fa-pencil ml-2 text-sm cursor-pointer"
						on:click={() => {
							changingSize = size;
							editingSize[index] = true;
						}}
					/>
					<button
						class="fa fa-circle-x ml-2 text-sm cursor-pointer"
						on:click={async () => {
							if (!oldSizes.includes(size)) {
								productMaster.sizes =
									productMaster.sizes.filter(
										(c) => c !== size
									);
								productMaster.products =
									productMaster.products.filter(
										(p) => p.size !== size
									);
							} else {
								if (
									!confirm(
										'사이즈를 삭제하시겠습니까?'
									)
								)
									return;
								const DeleteSize = gql`
									mutation DeleteSize(
										$productMasterId: Int
										$deletingSize: String
									) {
										deleteSize(
											productMasterId: $productMasterId
											deletingSize: $deletingSize
										) {
											success
											message
										}
									}
								`;
								const result =
									await client.request(
										DeleteSize,
										{
											productMasterId:
												productMaster.id,
											deletingSize: size
										}
									);
								const { success, message } =
									result.deleteSize;
								alert(message);
								if (success) {
									location.reload();
								}
							}
						}}
					/>
				{/if}
			</div>
		{/each}
	</div>
</div>
