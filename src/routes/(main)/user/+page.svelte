<script>
	import UserMembershipNav from '$lib/components/user/UserMembershipNav.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import Button from '$lib/components/Button.svelte';
	import Tr from '$lib/components/Tr.svelte';
	import Th from '$lib/components/Th.svelte';
	import Td from '$lib/components/Td.svelte';
	import { goto } from '$app/navigation';
	import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';
	import { page } from '$app/stores';
	import { getGyms } from '../../../stores/user.js';
	import Pagination from '$lib/components/Pagination.svelte';
	import { formatBusinessRegistrationNumber } from '$lib/utils/formatBusinessRegistrationNumber';
	import DropdownSelectValue from '$lib/components/DropdownSelectValue.svelte';
	import formatMoney from '$lib/utils/formatMoney';
	import { formatPhone } from '$lib/utils/formatPhone';

	let state;

	$: state = $page.url.searchParams.get('state');

	let gyms = [];
	let totalCount = 0;

	$: {
		getGyms(
			$page.url.searchParams.get('page'),
			null,
			null,
			$page.url.searchParams.get('membership'),
			$page.url.searchParams.get('keyword'),
			$page.url.searchParams.get('hasDraft')
		).then((result) => {
			gyms = result.gyms;
			totalCount = result.totalCount;
		});
	}
</script>

<nav>
	<div class="flex items-center">
		<UserMembershipNav />
		<button
			on:click={() => {
				goto('/setting/membership');
			}}
			class="fa fa-gear text-lg ml-2 cursor-pointer"
		/>
	</div>
	<div class="flex mt-5">
		<SearchBar />
		<div class="mx-2" />
		<DropdownSelectValue
			classes="h-11"
			onSelect={(value) => {
				let query = new URLSearchParams(
					$page.url.searchParams.toString()
				);
				query.set('page', '1');
				query.set('hasDraft', value);
				let url = $page.url.pathname;
				goto(`${url}?${query}`);
			}}
			value={$page.url.searchParams.get(
				'hasDraft'
			)}
			options={[
				'전체',
				'로고시안 보유',
				'로고시안 미보유'
			]}
		/>
	</div>
</nav>

<LoadingIndicator>
	<main
		class="overflow-x-scroll  mt-8 bg-white border"
	>
		<table class="w-full">
			<thead>
				<tr>
					<Th classes="w-48">아이디</Th>
					<Th classes="w-48">체육관</Th>
					<Th classes="w-24">대표자</Th>
					<Th classes="w-32">연락처</Th>
					<Th classes="w-32">사업자번호</Th>
					<Th>회원등급</Th>
					<Th>승인상태</Th>
					<Th>스마터머니</Th>
					<Th>누적구매금액</Th>
					<Th />
					<Th>가입일</Th>
				</tr>
			</thead>
			<tbody>
				{#each gyms as gym}
					<Tr
						error={!gym.isActive}
						classes="cursor-pointer"
						onClick={() => {
							goto(
								'/user/edit/' +
									gym.id +
									'?userId=' +
									gym.user.userId
							);
						}}
					>
						<Td whitespaceNoWrap>
							<div
								class="{gym.hasDraft
									? 'border rounded p-1 bg-primary text-white'
									: ''} w-fit"
							>
								{gym.user.identification}
							</div>
						</Td>
						<Td whitespaceNoWrap>
							{gym.name}
						</Td>
						<Td>{gym.user.name}</Td>
						<Td>
							{formatPhone(gym.user.phone)}
						</Td>
						<Td whitespaceNoWrap
							>{formatBusinessRegistrationNumber(
								gym.businessRegistrationNumber
							)}</Td
						>
						<Td>{gym.membership}</Td>
						<Td>
							{#if gym.user.isActive}
								<div
									class="p-1 bg-green-200 border-green-200 rounded border text-green-800 text-center text-xs"
								>
									승인
								</div>
							{:else}
								<div
									class="p-1 rounded bg-error text-red-800 border-error hover:bg-error hover:border-error hover:text-red-800 text-center text-xs"
								>
									미승인
								</div>
							{/if}
						</Td>
						<Td>
							{formatMoney({
								money: gym.user.wallet
									? gym.user.wallet.balance
									: '0'
							})}
						</Td>
						<Td>
							{formatMoney({
								money:
									gym.cumulativePurchaseAmount
							})}
						</Td>
						<Td>
							{#if gym.user.isActive}
								<button
									class="text-blue-500 hover:text-blue-700 p-2"
									on:click={(e) => {
										e.stopPropagation();
										goto(
											`/user/edit/${gym.id}/logo` +
												'?userId=' +
												gym.user.userId
										);
									}}>로고시안</button
								>
							{/if}
						</Td>

						<Td whitespaceNoWrap
							>{new Date(
								gym.dateCreated
							).toLocaleDateString()}</Td
						>
					</Tr>
				{/each}
			</tbody>
		</table>
	</main>

	<Pagination {totalCount} classes="my-10" />
</LoadingIndicator>
