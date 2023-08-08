<script>
	import SearchBar from '$lib/components/SearchBar.svelte';
	import Button from '$lib/components/Button.svelte';
	import Tr from '$lib/components/Tr.svelte';
	import Th from '$lib/components/Th.svelte';
	import Td from '$lib/components/Td.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { dateToIsoDateString } from '$lib/utils/dateToIsoDateString';
	import { getSubcontractorUsers } from '../../../../stores/user.js';
	import { formatBusinessRegistrationNumber } from '$lib/utils/formatBusinessRegistrationNumber';
	import formatPhone from '../../../../utils/format_phone';
	import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import { getSubcontractorColor } from '$lib/utils/getSubcontractorColor.js';

	let subcontractors = [];

	let totalCount = 0;

	$: {
		getSubcontractorUsers(
			$page.url.searchParams.get('page'),
			$page.url.searchParams.get('keyword')
		).then((result) => {
			subcontractors = result.subcontractors;
			totalCount = result.totalCount;
		});
	}
</script>

<nav>
	<div class="flex justify-between items-center">
		<SearchBar classes="mt-5" />
		<div class="flex">
			<Button
				classes="p-3"
				onClick={() =>
					goto('subcontractor/edit/new')}
			>
				<span>작업실 추가</span>
			</Button>
		</div>
	</div>
</nav>

<LoadingIndicator>
	<main
		class="overflow-x-scroll border rounded mt-5 bg-white"
	>
		<table class="w-full">
			<thead>
				<tr>
					<Th>아이디</Th>
					<Th>작업실명</Th>
					<Th>담당자</Th>
					<Th>휴대폰</Th>
					<Th>사업자등록번호</Th>
					<Th>주소</Th>
					<Th>가입일</Th>
				</tr>
			</thead>
			<tbody>
				{#each subcontractors as subcontractor}
					<Tr
						classes="cursor-pointer"
						onClick={() => {
							goto(
								'subcontractor/edit/' +
									subcontractor.id
							);
						}}
					>
						<Td
							>{subcontractor.user
								.identification}</Td
						>
						<Td whitespaceNoWrap classes="w-28">
							<div
								class="border rounded p-1 text-sm  text-center {getSubcontractorColor(
									subcontractor.name
								)}"
							>
								{subcontractor.name}
							</div>
						</Td>
						<Td>{subcontractor.user.name}</Td>
						<Td whitespaceNoWrap
							>{formatPhone(
								subcontractor.user.phone
							)}</Td
						>
						<Td whitespaceNoWrap
							>{formatBusinessRegistrationNumber(
								subcontractor.businessRegistrationNumber
							) ?? '-'}</Td
						>
						<Td whitespaceNoWrap
							>{subcontractor.address ?? '-'}</Td
						>
						<Td whitespaceNoWrap
							>{dateToIsoDateString(
								subcontractor.user.dateCreated
							)}</Td
						>
					</Tr>
				{/each}
			</tbody>
		</table>
	</main>

	<Pagination {totalCount} classes="my-10" />
</LoadingIndicator>
