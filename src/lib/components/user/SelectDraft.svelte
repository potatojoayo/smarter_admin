<script>
	import formatMoney from '../../utils/formatMoney';
	import { onMount } from 'svelte';
	import Dialog from '../Dialog.svelte';
	import DraftDetailModal from '../modal/DraftDetailModal.svelte';
	let selectedDraft;
	let open = false;
	export let drafts = [];
	export let selected = null,
		onUpdateDraft;
	let index = 0;
	onMount(() => {
		if (drafts.length > 0) {
			selected = drafts[0];
		}
	});
	$: {
		if (index >= drafts.length) {
			index = 0;
		}
	}
</script>

<div
	class="flex items-center mt-3 justify-between"
>
	<button
		class="fa fa-chevron-left text-2xl text-gray-800 cursor-pointer w-10
					{index > 0 ? 'visible' : 'invisible'}
"
		on:click={() => {
			index -= 1;
			selected = drafts[index];
		}}
	/>
	<div class="relative w-full flex flex-col">
		<button
			class="mx-auto"
			on:click={() => {
				selectedDraft = drafts[index];
				open = true;
			}}
		>
			<img
				src={drafts[index].image}
				alt=""
				class="w-72 object-contain "
			/>
		</button>
		<div
			class="bg-black bg-opacity-50 absolute top-2 rounded-xl text-sm text-white py-1 px-2  right-2"
		>
			{`${index + 1}/${drafts.length}`}
		</div>
		<div class="flex mt-3 justify-around">
			<div class="flex flex-col">
				<span class="text-sm"> 작업비 </span>
				<div class="text-lg">
					{formatMoney({
						money: drafts[index].priceWork
					})}
				</div>
			</div>
			<div class="flex flex-col ml-2">
				<span class="text-sm"> 작업용역비 </span>
				<div class="text-lg">
					{formatMoney({
						money: drafts[index].priceWorkLabor
					})}
				</div>
			</div>
			<div class="flex flex-col ml-2">
				<span class="text-sm"> 폰트 </span>
				<div class="text-lg">
					{drafts[index].font ?? '-'}
				</div>
			</div>
			<div class="flex flex-col ml-2">
				<span class="text-sm"> 실색깔 </span>
				<div class="text-lg">
					{drafts[index].threadColor ?? '-'}
				</div>
			</div>
			<div class="flex flex-col ml-2">
				<span class="text-sm"> 프린팅 </span>
				<div class="text-lg">
					{drafts[index].printing ?? '-'}
				</div>
			</div>
		</div>
	</div>
	<button
		class="fa fa-chevron-right text-2xl text-gray-800 cursor-pointer w-10
					{index < drafts.length - 1
			? 'visible'
			: 'invisible'}
"
		on:click={() => {
			index += 1;
			selected = drafts[index];
		}}
	/>
</div>

{#if open}
	<DraftDetailModal
		draftId={selectedDraft.id}
		bind:open
		editable
		onSuccess={onUpdateDraft}
	/>
{/if}
