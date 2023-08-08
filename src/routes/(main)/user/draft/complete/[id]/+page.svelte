<script>
	import Td from '../../../../../../lib/components/Td.svelte';
	import Tr from '../../../../../../lib/components/Tr.svelte';
	import Button from '../../../../../../lib/components/Button.svelte';
	import formatMoney from '../../../../../../utils/format_money';
	import DropdownSelectValue from '../../../../../../lib/components/DropdownSelectValue.svelte';
	import { completeDraftRequest } from '../../../../../../stores/product.js';
	import formatPhone from '../../../../../../utils/format_phone';
	import { fontOptions } from '../../../../../../data/models/font_options.js';

	export let data;
	let draftRequest = data.draftRequest;
	let user = draftRequest.user;
	let gym = draftRequest.user.gym;
	let productMaster = draftRequest.productMaster;

	let drafts = [];
	if (draftRequest.drafts.length > 0) {
		drafts = draftRequest.drafts;
	} else {
		drafts = [
			{
				priceWorkLabor: null,
				priceWork: null,
				file: null,
				memo: ''
			}
		];
	}

	let threadColorOptions = [
		'없음',
		'노랑',
		'검정',
		'흰색',
		'빨강'
	];

	let draftIndex = 0;

	const addLogo = (e) => {
		const image = e.target.files[0];
		const reader = new FileReader();
		const newLogo = {
			priceWorkLabor: null,
			priceWork: null,
			file: e.target.files[0],
			memo: ''
		};
		drafts.push(newLogo);
		reader.onload = (ev) => {
			newLogo.image = ev.target.result;
			draftIndex = drafts.length - 1;
		};
		reader.readAsDataURL(image);
	};

	const changeLogo = (e) => {
		const image = e.target.files[0];
		const reader = new FileReader();
		drafts[draftIndex].file = e.target.files[0];
		reader.onload = (ev) => {
			drafts[draftIndex].image = ev.target.result;
		};
		reader.readAsDataURL(image);
	};
</script>

<div class="flex justify-center">
	<span class="text-xl"> {gym.name}</span>
</div>
<main class="flex flex-wrap justify-center my-10">
	<section
		class="flex flex-col  min-w-[500px] max-w-[500px]"
	>
		<div
			class="flex flex-col border p-10 rounded"
		>
			<div class="flex flex-wrap">
				<div class="flex flex-col">
					<div class="text-sm">체육관명</div>
					<div class="mt-1">{gym.name}</div>
				</div>
				<div class="flex flex-col ml-5">
					<div class="text-sm">관장</div>
					<div class="mt-1">{user.name}</div>
				</div>
				<div class="flex flex-col ml-5">
					<div class="text-sm">전화번호</div>
					<div class="mt-1">
						{formatPhone(user.phone)}
					</div>
				</div>
				<div class="flex flex-col ml-5">
					<div class="text-sm">이메일</div>
					<div class="mt-1">
						{gym.email ?? '-'}
					</div>
				</div>
			</div>
			<table class="mt-5 border">
				<thead>
					<tr>
						<Td>카테고리</Td>
						<Td>서브카테고리</Td>
					</tr></thead
				>
				<tbody>
					<Tr>
						<Td>
							{productMaster.category.name}
						</Td>
						<Td>
							{productMaster.subCategory.name}
						</Td>
					</Tr>
				</tbody>
			</table>
		</div>
	</section>

	<div class="mx-3" />

	<section
		class="flex flex-col border p-10 rounded-tr rounded-br min-w-[500px]"
	>
		<div class="flex flex-col justify-between">
			<span class="text-lg mb-5">
				{productMaster.category.name +
					' > ' +
					productMaster.subCategory.name}
			</span>

			{#if draftRequest.state === '요청'}
				<div class="flex justify-end">
					{#if drafts[draftIndex].image}
						<div>
							<label
								for="change"
								class="cursor-pointer border p-4 rounded text-sm hover:bg-primary hover:text-white"
								>도안 수정</label
							>
							<input
								type="file"
								id="change"
								class="invisible w-0"
								on:change={changeLogo}
							/>
						</div>
					{/if}
					<div class="mx-1" />
					{#if drafts[draftIndex].image}
						<div>
							<label
								for="new"
								class="cursor-pointer border p-4 rounded text-sm hover:bg-primary hover:text-white"
								>도안 추가</label
							>
							<input
								type="file"
								id="new"
								class="invisible w-0"
								on:change={addLogo}
							/>
						</div>
					{/if}
				</div>
			{/if}
		</div>

		<div
			class="flex items-center mt-3 justify-between"
		>
			<i
				class="fa fa-chevron-left text-2xl text-gray-800 cursor-pointer w-10
					{draftIndex > 0 ? 'visible' : 'invisible'}
"
				on:click={() => {
					draftIndex -= 1;
				}}
			/>
			<div class="relative mx-auto mt-5">
				{#if drafts[draftIndex].image}
					<img
						src={drafts[draftIndex].image}
						alt=""
						class="h-72 rounded object-cover"
					/>
					<div
						class="bg-black bg-opacity-50 absolute bottom-2 rounded-xl text-sm text-white py-1 px-2  right-2"
					>
						{`${draftIndex + 1}/${drafts.length}`}
					</div>
				{:else}
					<div
						class=" w-72 h-72 relative w-40 h-40 flex justify-center items-center
						border border-dashed
"
					>
						<input
							type="file"
							on:change={changeLogo}
							class="absolute top-0 right-0 opacity-0 h-72 w-72 cursor-pointer"
						/>
						<i
							class="fa fa-plus text-primary text-3xl"
						/>
					</div>
				{/if}
			</div>
			<i
				class="fa fa-chevron-right text-2xl text-gray-800 cursor-pointer w-10
					{draftIndex < drafts.length - 1
					? 'visible'
					: 'invisible'}
"
				on:click={() => {
					draftIndex += 1;
				}}
			/>
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
						value={formatMoney(
							drafts[draftIndex].priceWork
						)}
						on:input={(e) => {
							drafts[draftIndex].priceWork =
								e.target.value.replace(/\D/g, '');
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
						class="rounded border  p-2 text-right w-32"
						value={formatMoney(
							drafts[draftIndex].priceWorkLabor
						)}
						on:input={(e) => {
							drafts[draftIndex].priceWorkLabor =
								e.target.value.replace(/\D/g, '');
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
					bind:value={drafts[draftIndex].font}
					placeholder="폰트설정"
				/>
			</div>
			<div class="flex flex-col ml-3">
				<DropdownSelectValue
					classes="min-w-[130px]"
					options={threadColorOptions}
					bind:value={drafts[draftIndex]
						.threadColor}
					placeholder="실색깔 설정"
				/>
			</div>
		</div>
		<div class="flex flex-col mt-5">
			<span>메모</span>
			<textarea
				type="text"
				class="rounded border mt-3 p-3 min-h-[100px]"
				bind:value={drafts[draftIndex].memo}
			/>
		</div>

		{#if draftRequest.state === '요청'}
			<div class="flex mt-5 justify-end">
				{#if drafts.length > 1}
					<Button
						classes="w-28 hover:bg-error hover:text-red-800 hover:border-error"
						onClick={() => {
							drafts.splice(draftIndex, 1);
							drafts = drafts;
						}}>삭제</Button
					>
				{/if}
				<div class="mx-2" />
				<Button
					classes="w-28"
					onClick={async () => {
						if (!confirm('저장하시겠습니까?'))
							return;

						for (let d of drafts) {
							if (!d.image) {
								return alert(
									'로고시안 이미지를 모두 첨부해주세요.'
								);
							}
							if (!d.priceWork) {
								return alert(
									'작업비를 모두 입력해주세요.'
								);
							}
							if (!d.priceWorkLabor) {
								return alert(
									'작업 용역비를 모두 입력해주세요.'
								);
							}
						}
						if (
							await completeDraftRequest(
								draftRequest.draftRequestId,
								drafts
							)
						) {
							alert('저장되었습니다.');
							history.back();
						} else {
							alert('실패');
						}
					}}>저장</Button
				>
			</div>
		{/if}
	</section>
</main>
