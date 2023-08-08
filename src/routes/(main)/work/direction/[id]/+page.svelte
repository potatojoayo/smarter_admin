<script lang="ts">
	import Tr from '$lib/components/Tr.svelte';
	import Td from '$lib/components/Td.svelte';
	import Button from '$lib/components/Button.svelte';
	import { page } from '$app/stores';
	import Th from '$lib/components/Th.svelte';
	import { getColor } from '$lib/utils/getColor.js';
	import {
		completePreWorks,
		completeWorks,
		updateWorkMemos
	} from '../../../../../stores/work.js';
	import { formatPhone } from '$lib/utils/formatPhone';
	import DraftDetailModal from '$lib/components/modal/DraftDetailModal.svelte';
	import mixpanel from 'mixpanel-browser';
	import type { PageData } from './$types.js';
	import AccountSetting from '$lib/components/setting/AccountSetting.svelte';

	export let data: PageData;
	let work = data.work,
		subcontractors = data.subcontractors,
		open = false,
		draftId: number,
		user = data.me;

	$: user = data.me;

	function getRowSpan(detail) {
		const sameDraftIdCount = work.details.filter(
			(d) => d.draft.id === detail.draft.id
		);

		const userRequestCount =
			sameDraftIdCount.filter(
				(d) =>
					d.userRequest !== null &&
					d.userRequest !== ''
			);

		return (
			sameDraftIdCount.length +
			userRequestCount.length
		);
	}
</script>

<section
	class="flex justify-between items-center"
>
	<div
		class="flex border p-5 rounded mx-auto bg-white"
	>
		<div class="flex flex-col">
			<div class="text-sm">주문도장</div>
			<div class="text-2xl">
				{work.orderMaster.user.gym.name}
			</div>
		</div>
		<div class="flex flex-col ml-10">
			<div class="text-sm">연락처</div>
			<div class="text-2xl">
				{formatPhone(work.orderMaster.user.phone)}
			</div>
		</div>
	</div>
</section>

<main class="flex flex-col">
	<div class="mt-5 flex justify-end">
		<Button
			classes="p-3"
			onClick={() => {
				window.open(
					`${$page.url.origin}/print/direction/${work.workId}`,
					'_blank',
					'height=800, width=1400'
				);
			}}
		>
			<i class="fa fa-download mr-1" />
			<span>작업지시서 출력</span>
		</Button>
		{#if work.subcontractor.isPreWorking}
			{#each subcontractors as s}
				{#if s.name !== '전처리작업실' && s.name !== '띠자수작업실'}
					<Button
						classes="ml-2"
						onClick={async () => {
							if (
								confirm(
									`선택한 작업을 ${s.name}에 배정하시겠습니까?`
								)
							) {
								if (
									await completePreWorks(
										[work.workId],
										s.id
									)
								) {
									mixpanel.track(
										'전처리작업 완료 및 작업실 배정',
										{ ...work, ...s }
									);
									alert(
										'선택하신 작업이 완료되었습니다.'
									);
									window.opener.postMessage(
										'refresh'
									);
									if (history.length === 1) {
										return window.close();
									}
									return history.back();
								}
								alert('실패');
							}
						}}
					>
						<span>{s.name}</span>
					</Button>
				{/if}
			{/each}
		{/if}
		{#if work.state === '작업중' && !work.subcontractor.isPreWorking}
			<div class="mx-1" />
			<Button
				classes="p-3"
				onClick={async () => {
					if (
						confirm('작업을 완료하시겠습니까?')
					) {
						if (
							await completeWorks([work.workId])
						) {
							mixpanel.track('후작업 완료', work);
							alert('작업이 완료되었습니다.');
							window.opener.postMessage(
								'refresh'
							);
							if (history.length === 1) {
								return window.close();
							}
							return history.back();
						}
						alert('실패');
					}
				}}>작업완료</Button
			>
		{/if}
	</div>

	<div
		class="flex flex-col w-full mt-5 rounded bg-white"
	>
		<table class="border-collapse border">
			<thead>
				<tr>
					<Th classes="border w-40">상품</Th>
					<Th classes="border w-40">로고시안</Th>
					<Th classes="border  w-24">폰트</Th>
					<Th classes="border w-24">실색깔</Th>
					<Th classes="border w-24">프린팅</Th>
					<Th classes="w-28">색상</Th>
					<Th classes="w-24">사이즈</Th>
					<Th classes="w-24">수량</Th>
					<Th classes="w-44">이름</Th>
					<Th classes="w-20">작업상태</Th>
				</tr>
			</thead>
			<tbody>
				{#each work.details as detail, index}
					<Tr
						classes={index === 0 ||
						work.details[index - 1].draft.id !==
							detail.draft.id
							? 'border-t'
							: ''}
					>
						{#if index === 0 || work.details[index - 1].product.name !== detail.product.name}
							<Td
								rowspan={getRowSpan(detail)}
								classes="border text-center"
							>
								<img
									src={detail.productMaster
										.thumbnail}
									alt=""
								/>
								<div class="mt-2">
									{detail.product.name}
								</div>
							</Td>
							<Td
								rowspan={getRowSpan(detail)}
								classes="border"
							>
								<button
									class="w-full"
									on:click={(e) => {
										e.stopPropagation();
										if (user.subcontractor) {
											if (
												user.subcontractor
													.name !== '전처리작업실'
											) {
												return window.open(
													detail.draft.image,
													'_blank',
													'width=1024, height=1024'
												);
											}
										}

										draftId = detail.draft.id;
										open = true;
									}}
								>
									<!-- 이미지보기 -->
									<img
										src={detail.draft.image}
										class="w-28 mx-auto mb-2"
										alt=""
									/>
								</button>
							</Td>
							<Td
								rowspan={getRowSpan(detail)}
								classes="border whitespace-nowrap"
							>
								{detail.draft.font ?? '-'}
							</Td>
							<Td
								rowspan={getRowSpan(detail)}
								classes="border whitespace-nowrap"
							>
								{detail.draft.threadColor ?? '-'}
							</Td>
							<Td
								rowspan={getRowSpan(detail)}
								classes="border whitespace-nowrap"
							>
								{detail.draft.printing ?? '-'}
							</Td>
						{/if}
						<Td classes="whitespace-nowrap">
							{detail.product.color}
						</Td>
						<Td>
							{detail.product.size}
						</Td>
						<Td>
							{detail.quantity}
						</Td>
						<Td>
							{detail.studentNames}
						</Td>
						<Td>
							<div
								class="{getColor(
									work.state
								)} border rounded p-1 text-center"
							>
								{work.state}
							</div>
						</Td>
					</Tr>
					{#if detail.userRequest}
						<Tr>
							<Td colspan={5}>
								{detail.userRequest}
							</Td>
						</Tr>
					{/if}
				{/each}
			</tbody>
		</table>
	</div>

	<div class="mt-5">작업실 메모</div>
	<textarea
		class="mt-5 rounded resize-none"
		bind:value={work.memoBySubcontractor}
		disabled={!(
			user &&
			user.subcontractor &&
			!user.subcontractor.isPreWorking
		)}
	/>
	<div class="mt-5">전처리작업실 메모</div>
	<textarea
		class="mt-5 rounded resize-none"
		bind:value={work.memoByPreWorker}
		disabled={!(
			user &&
			user.subcontractor &&
			user.subcontractor.isPreWorking
		)}
	/>
	<div class="mt-5">관리자 메모</div>
	<textarea
		class="mt-5 rounded resize-none"
		bind:value={work.memoByAdmin}
		disabled={user && user.group !== '관리자'}
	/>

	<Button
		classes="ml-auto mt-5 p-3"
		onClick={async () => {
			if (confirm('메모를 저장하시겠습니까?')) {
				if (
					await updateWorkMemos(
						work.workId,
						work.memoBySubcontractor,
						work.memoByPreWorker,
						work.memoByAdmin
					)
				) {
					return alert('메모가 저장되었습니다.');
				}
				alert('실패');
			}
		}}>메모 저장</Button
	>
</main>

<div class="my-10" />

{#if open}
	<DraftDetailModal bind:open {draftId} />
{/if}
