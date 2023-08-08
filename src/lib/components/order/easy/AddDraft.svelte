<script>
	import Dialog from '../../Dialog.svelte';
	import ErrorButton from '../../ErrorButton.svelte';
	import Button from '../../Button.svelte';
	import formatMoney from '../../../utils/formatMoney';
	import DropdownSelectValue from '../../DropdownSelectValue.svelte';
	import { createDraft } from '../../../../stores/user.js';
	import { fontOptions } from '../../../../data/models/font_options.js';

	export let open;
	export let userId;
	export let productMaster;
	export let onSuccess;

	let draft = {};

	const openFile = (e) => {
		const image = e.target.files[0];
		const reader = new FileReader();
		reader.onload = (ev) => {
			draft.image = ev.target.result;
			draft.imageFile = image;
		};
		reader.readAsDataURL(image);
	};

	let threadColorOptions = [
		'없음',
		'노랑',
		'검정',
		'흰색',
		'빨강'
	];
	let inputPriceWork = '';
	let inputPriceWorkLabor = '';
</script>

<Dialog
	{open}
	classes="!top-1/2 items-center min-w-[700px]"
>
	<div class="mb-5 text-lg flex items-end">
		<span>{productMaster.name}</span>
	</div>
	<div
		class="w-60 h-60 flex justify-center items-center mt-10 {draft.image
			? ''
			: 'border-dashed'} border  relative overflow-hidden"
	>
		<input
			id="draft"
			type="file"
			on:change={openFile}
			class="absolute top-0 right-0 opacity-0 h-60 w-60 cursor-pointer
						{draft.image ? 'invisible ' : 'visible'}
						"
		/>
		<i
			class="fa fa-plus text-primary text-3xl absolute{draft.image
				? 'invisible absolute'
				: 'visible'}
				{draft.image ? 'invisible ' : 'visible'}
"
		/>

		<div
			class="group flex
						{draft.image ? 'visible' : 'invisible absolute'}
"
		>
			<div
				class="absolute top-2 right-2 cursor-pointer"
				on:click={() => {
					draft.image = null;
				}}
			>
				<i class="fa fa-circle-x text-gray-700" />
			</div>
			<img
				src={draft.image}
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
					type="text"
					class="rounded border  p-2 text-right w-32"
					on:input={(e) => {
						draft.priceWork =
							e.target.value.replace(/\D/g, '');
						inputPriceWork = formatMoney({
							money: draft.priceWork
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
					class="rounded border  p-2 text-right w-32"
					value={inputPriceWorkLabor}
					on:input={(e) => {
						draft.priceWorkLabor =
							e.target.value.replace(/\D/g, '');
						inputPriceWorkLabor = formatMoney({
							money: draft.priceWorkLabor
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
				bind:value={draft.font}
				placeholder="폰트설정"
			/>
		</div>
		<div class="flex flex-col ml-3">
			<DropdownSelectValue
				classes="min-w-[130px]"
				options={threadColorOptions}
				bind:value={draft.threadColor}
				placeholder="실색깔 설정"
			/>
		</div>
	</div>
	<div class="flex flex-col mt-5 w-80">
		<span>메모</span>
		<textarea
			type="text"
			class="rounded border mt-3 p-3 min-h-[100px] resize-none"
			bind:value={draft.memo}
		/>
	</div>

	<div class="flex justify-end mt-5 w-full">
		<ErrorButton
			classes="p-3 w-20"
			onClick={() => {
				open = false;
			}}>취소</ErrorButton
		>
		<div class="mx-1" />
		<Button
			classes="p-3 w-20"
			onClick={async () => {
				if (!confirm('저장하시겠습니까?')) return;
				if (!draft.image) {
					return alert(
						'로고시안 이미지를 모두 첨부해주세요.'
					);
				}
				if (!draft.priceWork) {
					return alert(
						'작업비를 모두 입력해주세요.'
					);
				}
				if (!draft.priceWorkLabor) {
					return alert(
						'작업 용역비를 모두 입력해주세요.'
					);
				}
				let input = {
					productMasterId:
						productMaster.productMasterId,
					font: draft.font,
					threadColor: draft.threadColor,
					file: draft.imageFile,
					priceWork: draft.priceWork,
					priceWorkLabor: draft.priceWorkLabor,
					memo: draft.memo
				};
				const result = await createDraft(
					userId,
					input
				);
				if (result.success) {
					alert('저장되었습니다.');
					open = false;
					return onSuccess(result.draft);
				}
				alert('실패');
			}}>저장</Button
		>
	</div>
</Dialog>
