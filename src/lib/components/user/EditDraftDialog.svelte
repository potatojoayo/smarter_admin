<script>
	import formatMoney from '$lib/utils/formatMoney';

	import { fontOptions } from '../../../data/models/font_options.js';
	import Dialog from '$lib/components/Dialog.svelte';
	import DropdownSelectValue from '$lib/components/DropdownSelectValue.svelte';
	import Button from '$lib/components/Button.svelte';
	import { threadColorOptions } from '../../../data/models/threadColorOptions.js';
	import {
		createOrUpdateDraft,
		deleteDrafts
	} from '../../../stores/user.js';
	import { page } from '$app/stores';

	export let open;
	export let selectedDraft;

	let inputPriceWork = selectedDraft.priceWork;
	let inputPriceWorkLabor =
		selectedDraft.priceWorkLabor;
	let file;
	const changeLogo = (e) => {
		const image = e.target.files[0];
		const reader = new FileReader();
		file = e.target.files[0];
		reader.onload = (ev) => {
			selectedDraft.image = ev.target.result;
		};
		reader.readAsDataURL(image);
		//
	};

	function close() {
		open = false;
	}

	const save = async () => {
		if (
			!confirm('로고시안을 저장하시겠습니까?')
		) {
			return;
		}
		if (!selectedDraft.image && !file) {
			return alert(
				'로고시안 이미지를 첨부해주세요.'
			);
		}
		if (!selectedDraft.priceWork) {
			return alert('작업비를 입력해주세요.');
		}
		if (!selectedDraft.priceWorkLabor) {
			return alert('작업 용역비를 입력해주세요.');
		}
		let subCategory =
			selectedDraft.subCategory.name;
		let draft = {
			id: selectedDraft.id,
			printing: selectedDraft.printing,
			priceWork: selectedDraft.priceWork,
			priceWorkLabor:
				selectedDraft.priceWorkLabor,
			memo: selectedDraft.memo,
			font: selectedDraft.font,
			threadColor: selectedDraft.threadColor,
			image: file
		};
		if (
			await createOrUpdateDraft({
				userId:
					$page.url.searchParams.get('userId'),
				draft,
				subCategory
			})
		) {
			alert('저장되었습니다.');
			open = false;
			location.reload();
			return;
		}
		alert('실패');
	};

	const deleteDraft = async () => {
		if (
			!confirm('로고시안을 삭제하시겠습니까?')
		) {
			return;
		}
		if (await deleteDrafts([selectedDraft.id])) {
			alert('삭제되었습니다.');
			open = false;
			location.reload();
			return;
		}
		alert('실패');
	};
</script>

<Dialog {open} classes="flex flex-col">
	<button
		class="absolute right-5 top-5"
		on:click={() => {
			open = false;
		}}
	>
		<i class="fa-regular fa-x" />
	</button>
	<div>
		{selectedDraft.subCategory.name}
	</div>
	<div
		class="mt-5 h-60 flex justify-center relative"
	>
		{#if selectedDraft.image}
			<label for="input">
				<img
					src={selectedDraft.image}
					alt=""
					class="h-60 rounded object-cover"
				/>
			</label>
			<input
				id="input"
				type="file"
				on:change={changeLogo}
				class="absolute top-0 right-0 opacity-0 h-60 w-full cursor-pointer"
			/>
		{:else}
			<div
				class=" w-full h-60 relative flex justify-center items-center
						border border-dashed
"
			>
				<input
					type="file"
					on:change={changeLogo}
					class="absolute top-0 right-0 opacity-0 h-60 w-60 cursor-pointer"
				/>
				<i
					class="fa fa-plus text-primary text-3xl"
				/>
			</div>
		{/if}
	</div>
	<div class="flex mt-5">
		<div class="flex flex-col">
			<div class="flex">
				<span>작업비</span>
				<span class="text-red-500 ml-1">*</span>
			</div>
			<div class="flex items-center mt-3 ">
				<input
					type="text"
					class="rounded border  p-2 text-right w-32"
					value={inputPriceWork}
					on:input={(e) => {
						selectedDraft.priceWork =
							e.target.value.replace(/\D/g, '');
						inputPriceWork = formatMoney({
							money: selectedDraft.priceWork
						});
					}}
				/>
				<span class="text-lg ml-2"> 원 </span>
			</div>
		</div>
		<div class="flex flex-col ml-5">
			<div class="flex">
				<span>작업용역비</span>
				<span class="text-red-500 ml-1">*</span>
			</div>
			<div class="flex items-center mt-3 ">
				<input
					value={inputPriceWorkLabor}
					type="text"
					class="rounded border  p-2 text-right w-32"
					on:input={(e) => {
						selectedDraft.priceWorkLabor =
							e.target.value.replace(/\D/g, '');
						inputPriceWorkLabor = formatMoney({
							money: selectedDraft.priceWorkLabor
						});
					}}
				/>
				<span class="text-lg ml-2"> 원 </span>
			</div>
		</div>
	</div>
	<div class="flex mt-5">
		<div class="flex flex-col">
			<DropdownSelectValue
				classes="min-w-[130px]"
				options={fontOptions}
				bind:value={selectedDraft.font}
				placeholder="폰트설정"
			/>
		</div>
		<div class="flex flex-col ml-3">
			<DropdownSelectValue
				classes="min-w-[130px]"
				options={threadColorOptions}
				bind:value={selectedDraft.threadColor}
				placeholder="실색깔 설정"
			/>
		</div>
	</div>
	<div class="flex flex-col mt-5">
		<span>메모</span>
		<textarea
			type="text"
			class="rounded border mt-3 p-3 min-h-[100px]"
			bind:value={selectedDraft.memo}
		/>
	</div>
	<div class="flex mt-5 space-x-2">
		<Button
			classes="mt-5 hover:bg-error hover:border-error flex-1"
			onClick={deleteDraft}>삭제</Button
		>
		<Button classes="mt-5 flex-1" onClick={save}
			>저장</Button
		>
	</div>
</Dialog>
<div
	on:click|preventDefault={close}
	class="fixed w-screen h-screen
	bg-zinc-900 top-0 left-0 opacity-50 z-30
	transition-opacity duration-500
{open ? 'fixed' : 'invisible'}
"
/>
