<script>
	import Td from '../../../../../../lib/components/Td.svelte';
	import Tr from '../../../../../../lib/components/Tr.svelte';
	import { page } from '$app/stores';
	import { getDrafts } from '../../../../../../stores/user.js';
	import formatMoney from '$lib/utils/formatMoney';
	import Button from '$lib/components/Button.svelte';
	import Th from '$lib/components/Th.svelte';
	import DraftDetailModal from '$lib/components/modal/DraftDetailModal.svelte';

	export let data;
	let gym = data.gym;

	let open = false;
	let add = false;
	let drafts = [];
	let selectedDraft;

	$: {
		getDrafts({
			userId: $page.url.searchParams.get('userId')
		}).then((result) => {
			drafts = result;
		});
	}
</script>

<div
	class="flex justify-center mt-4 bg-white w-fit mx-auto p-4 border rounded"
>
	<span class="text-2xl"> {gym.name}</span>
</div>
<main
	class="flex flex-wrap justify-center my-10 space-x-5"
>
	<section class="flex flex-col w-full">
		<div class="flex flex-col">
			<div class="flex justify-end items-end">
				<Button
					onClick={() => {
						selectedDraft = { id: -1 };
						add = true;
						open = true;
					}}>로고시안 추가</Button
				>
			</div>
			<table class="mt-5 border bg-white">
				<thead>
					<tr>
						<Th classes="border-x w-32"
							>카테고리</Th
						>
						<Th classes="border-r w-48"
							>로고시안</Th
						>
						<Th classes="border-r w-32">작업비</Th
						>
						<Th classes="border-r w-32"
							>작업용역비</Th
						>
						<Th classes="border-r w-32">실색깔</Th
						>
						<Th classes="border-r w-32">폰트</Th>
						<Th classes="border-r w-32">프린팅</Th
						>
						<Th classes="border-r">메모</Th>
					</tr></thead
				>
				<tbody>
					{#each drafts as draft}
						<Tr
							classes="cursor-pointer hover:bg-gray-50"
							onClick={() => {
								selectedDraft = draft;
								add = false;
								open = true;
							}}
						>
							<Td>{draft.subCategory.name}</Td>
							<Td
								classes="justify-center flex border-x"
							>
								<img
									src={draft.image}
									alt="이미지"
									class="w-40"
								/>
							</Td>
							<Td classes="border-r"
								>{formatMoney({
									money: draft.priceWork
								})}</Td
							>
							<Td classes="border-r"
								>{formatMoney({
									money: draft.priceWorkLabor
								})}</Td
							>
							<Td classes="border-r">
								{draft.threadColor ?? '-'}
							</Td>
							<Td classes="border-r">
								{draft.font ?? '-'}
							</Td>
							<Td classes="border-r"
								>{draft.printing ?? '-'}</Td
							>
							<Td>
								{draft.memo ?? '-'}
							</Td>
						</Tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<div class="mx-3" />
</main>

{#if open}
	<DraftDetailModal
		bind:open
		draftId={selectedDraft.id}
		{add}
		userId={gym.user.userId}
		editable
	/>
{/if}
