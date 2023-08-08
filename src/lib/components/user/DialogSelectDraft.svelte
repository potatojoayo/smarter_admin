<script>
	import Dialog from '../Dialog.svelte';
	import {
		closeSelectDraftDialog,
		isSelectDraftDialogOpen,
		selectedRequest
	} from '../../../stores/user.js';
	import TitleAndData from '../TitleAndData.svelte';
	import ErrorButton from '../ErrorButton.svelte';
	import Button from '../Button.svelte';
	import formatMoney from '../../utils/formatMoney';
	import { completeDraftRequest } from '../../../stores/product.js';
	import { dateToIsoDateString } from '../../utils/dateToIsoDateString';
	import DropdownSelectValue from '../DropdownSelectValue.svelte';
	import { fontOptions } from '../../../data/models/font_options.js';

	const openFile = (e) => {
		const image = e.target.files[0];
		const reader = new FileReader();
		reader.onload = (ev) => {
			request.draft.image = ev.target.result;
			request.draft.imageFile = image;
		};
		reader.readAsDataURL(image);
	};

	let request = $selectedRequest;
	let font = request.draft
		? request.draft.font
		: null;
	let threadColor = request.draft
		? request.draft.threadColor
		: null;
	let threadColorOptions = [
		'없음',
		'노랑',
		'검정',
		'흰색',
		'빨강'
	];
	let inputPriceWork = '';
	let inputPriceWorkLabor = '';
	if (!request.draft) {
		request.draft = {};
	} else {
		inputPriceWork = formatMoney({
			money: request.draft.priceWork
		});
		inputPriceWorkLabor = formatMoney({
			money: request.draft.priceWorkLabor
		});
	}

	export let dataList = [
		{
			title: '체육관',
			data: request.user.gym.name
		},
		{ title: '휴대폰', data: request.user.phone },
		{
			title: '상품명',
			data: request.productMaster.name
		},
		{
			title: '요청날짜',
			data: dateToIsoDateString(
				request.dateCreated
			)
		},
		{
			title: '완료날짜',
			data: dateToIsoDateString(
				request.dateFinished
			)
		}
	];
</script>

<Dialog
	open={$isSelectDraftDialogOpen}
	classes="!top-1/2 items-center"
>
	<div class="mb-5 text-lg flex items-end">
		<span>시안 등록</span>
	</div>
	<div class="flex">
		{#each dataList as data}
			<TitleAndData {data} classes="mr-10" />
		{/each}
	</div>
	<div
		class="w-60 h-60 flex justify-center items-center mt-10 {request.draft
			? ''
			: 'border-dashed'} border  relative overflow-hidden"
	>
		<input
			id="draft"
			type="file"
			disabled={request.state === '완료'}
			on:change={openFile}
			class="absolute top-0 right-0 opacity-0 h-60 w-60 cursor-pointer
						{request.draft.image ? 'invisible ' : 'visible'}
						"
		/>
		<i
			class="fa fa-plus text-primary text-3xl absolute{request
				.draft.image
				? 'invisible absolute'
				: 'visible'}
				{request.draft.image ? 'invisible ' : 'visible'}
"
		/>

		<div
			class="group flex
						{request.draft.image
				? 'visible'
				: 'invisible absolute'}
"
		>
			{#if request.state === '요청'}
				<div
					class="absolute top-2 right-2 cursor-pointer"
					on:click={() => {
						request.draft.image = null;
					}}
				>
					<i
						class="fa fa-circle-x text-gray-700"
					/>
				</div>
			{/if}
			<img
				src={request.draft.image}
				class="object-cover"
				alt="thumbnail"
			/>
		</div>
	</div>

	<div class="flex mt-5">
		<div class="flex flex-col w-full">
			<div class="flex">
				<span>작업비</span>
				<span class="text-red-500 ml-1">*</span>
			</div>
			<div class="flex items-center mt-3 ">
				<input
					value={inputPriceWork}
					placeholder="0"
					disabled={request.state === '완료'}
					type="text"
					class="rounded border  p-2 text-right w-32"
					on:input={(e) => {
						request.draft.priceWork =
							e.target.value.replace(/\D/g, '');
						inputPriceWork = formatMoney({
							money: request.draft.priceWork
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
					type="text"
					placeholder="0"
					disabled={request.state === '완료'}
					class="rounded border  p-2 text-right w-32"
					value={inputPriceWorkLabor}
					on:input={(e) => {
						request.draft.priceWorkLabor =
							e.target.value.replace(/\D/g, '');
						inputPriceWorkLabor = formatMoney({
							money: request.draft.priceWorkLabor
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
				bind:value={font}
				placeholder="폰트설정"
			/>
		</div>
		<div class="flex flex-col ml-3">
			<DropdownSelectValue
				classes="min-w-[130px]"
				options={threadColorOptions}
				bind:value={threadColor}
				placeholder="실색깔 설정"
			/>
		</div>
	</div>
	<div class="flex flex-col mt-5 w-80">
		<span>메모</span>
		<textarea
			disabled={request.state === '완료'}
			type="text"
			class="rounded border mt-3 p-3 min-h-[100px]"
			bind:value={request.draft.memo}
		/>
	</div>

	<div class="flex justify-end mt-5 w-full">
		{#if request.state === '요청'}
			<ErrorButton
				classes="p-3 w-20"
				onClick={() => {
					closeSelectDraftDialog();
				}}>취소</ErrorButton
			>
			<div class="mx-1" />
			<Button
				classes="p-3 w-20"
				onClick={() =>
					completeDraftRequest(
						request,
						font,
						threadColor
					)}>저장</Button
			>
		{:else}
			<Button
				classes="p-3 w-20"
				onClick={() => {
					closeSelectDraftDialog();
				}}>확인</Button
			>
		{/if}
	</div>
</Dialog>
