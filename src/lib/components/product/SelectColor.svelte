<script>
	import { gql } from 'graphql-request';
	import { addNewProduct } from '../../../stores/product.js';
	import InputText from '../InputText.svelte';
	import HttpClient from '../../../data/providers/http_client';

	export let productMaster;
	export let oldColors;

	const client = HttpClient.getInstance();

	let inputColor = '',
		changingColor,
		editiongColor = Array(
			productMaster.colors.length
		).fill(false);

	function onSubmit(_) {
		if (!inputColor) {
			return;
		}
		inputColor = inputColor.trim();
		if (
			productMaster.colors.includes(inputColor)
		) {
			inputColor = '';
			return alert(
				'같은 색상은 추가할 수 없습니다.'
			);
		}
		productMaster.colors.push(inputColor.trim());
		productMaster.colors = productMaster.colors;
		for (let size of productMaster.sizes) {
			addNewProduct(
				productMaster,
				inputColor.trim(),
				size
			);
		}
		inputColor = '';
	}
</script>

<div
	class="flex flex-col flex-1 border p-5 rounded min-w-[400px] mt-5 bg-white"
>
	<div class="flex items-end">
		<span class="text-lg mr-1">색상</span>
		<span class="text-red-500 mr-3">*</span>
		<span class="text-xs text-gray-500"
			>원하시는 색상을 입력하신 후 엔터키를 눌러
			추가해주세요.</span
		>
	</div>
	<form
		action="submit"
		on:submit|preventDefault={onSubmit}
	>
		<InputText
			classes="rounded mt-3 max-w-[300px]"
			bind:value={inputColor}
		/>
	</form>
	<div class="flex flex-wrap mt-5 mr-3">
		{#each productMaster.colors as color, index}
			<div
				class="bg-gray-200 px-2 py-1  rounded flex items-center text-sm mr-1 mt-2"
			>
				{#if editiongColor[index]}
					<input
						type="text"
						bind:value={changingColor}
						class="h-8 w-24"
					/>
					<button
						class="mx-4 text-red-500"
						on:click={() =>
							(editiongColor[index] = false)}
					>
						취소
					</button>
					<button
						class="text-blue-500"
						on:click={async () => {
							if (
								!confirm(
									'색상을 변경하시겠습니까?'
								)
							)
								return;
							const ChangeColor = gql`
								mutation ChangeColor(
									$productMasterId: Int
									$changedColor: String
									$changingColor: String
								) {
									changeColor(
										productMasterId: $productMasterId
										changedColor: $changedColor
										changingColor: $changingColor
									) {
										success
										message
									}
								}
							`;
							const result = await client.request(
								ChangeColor,
								{
									productMasterId:
										productMaster.id,
									changedColor: color,
									changingColor
								}
							);
							const { success, message } =
								result.changeColor;
							alert(message);
							if (success) {
								location.reload();
							}
						}}
					>
						수정
					</button>
				{:else}
					{color}
					<button
						class="fa fa-pencil ml-2 text-sm cursor-pointer"
						on:click={() => {
							changingColor = color;
							editiongColor[index] = true;
						}}
					/>
					<button
						class="fa fa-circle-x ml-2 text-sm cursor-pointer"
						on:click={async () => {
							if (!oldColors.includes(color)) {
								productMaster.colors =
									productMaster.colors.filter(
										(c) => c !== color
									);
								productMaster.products =
									productMaster.products.filter(
										(p) => p.color !== color
									);
							} else {
								if (
									!confirm(
										'색상을 삭제하시겠습니까?'
									)
								)
									return;
								const DeleteColor = gql`
									mutation DeleteColor(
										$productMasterId: Int
										$deletingColor: String
									) {
										deleteColor(
											productMasterId: $productMasterId
											deletingColor: $deletingColor
										) {
											success
											message
										}
									}
								`;
								const result =
									await client.request(
										DeleteColor,
										{
											productMasterId:
												productMaster.id,
											deletingColor: color
										}
									);
								const { success, message } =
									result.deleteColor;
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
